import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput, LoginUserInput } from './schema'
import bcrypt from 'bcrypt'
import prisma from '../../prisma/index'

export async function createUserHandler(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
) {
    const { password, email, username } = request.body
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
                email,
                username,
                password: hashedPassword,
            },
        })

        return reply.code(201).send(user)
    } catch (e: unknown) {
        return reply.code(500).send(e)
    }
}

export async function authenticateUserHandler(
    request: FastifyRequest<{ Body: LoginUserInput }>,
    reply: FastifyReply
) {
    const { username, password } = request.body
    const user = await prisma.user.findUnique({ where: { username }})
    if (!user) {
        return reply.code(404).send({
            message: 'User does not exist',
        })
    }

    const isMatchPassword = bcrypt.compare(password, user.password)
    if (!isMatchPassword) {
        return reply.code(401).send({
            message: 'Password is incorrect',
        })
    }

    const token = request.jwt.sign({ userId: user.id, username: user.username });

    return reply.code(200).send({
        message: 'Authentication was successful',
        token,
    })
}