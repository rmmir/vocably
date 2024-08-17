import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput, LoginUserInput } from './schema'
import bcrypt from 'bcrypt'
import prisma from '../../prisma/index'

export async function createUserHandler(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
) {
    const { password, email, name } = request.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
        return reply.code(401).send({
            message: 'User already exists with this email',
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return reply.code(201).send(user)
    } catch (e: unknown) {
        return reply.code(500).send(e)
    }
}
