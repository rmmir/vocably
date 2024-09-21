import { FastifyReply, FastifyRequest } from 'fastify'
import { ParamsWithId } from '../../models/params'
import { getCurrentUser } from '../users/services'
import prisma from '../../prisma'
import { CreateLanguageInput } from './schema'
import { capitalizeFirstLetter } from '../../utils/formatters'

export async function getLanguages(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
        reply.code(404).send({ message: 'User unauthenticated.' })
    }

    const languages = prisma.language.findMany()
    reply.send(languages)
}

export async function getLanguageById(
    request: FastifyRequest<ParamsWithId>,
    reply: FastifyReply
) {
    const { id } = request.params
    reply.send({ message: `languages/${id} route hit` })
}

export async function createLanguage(
    request: FastifyRequest<{ Body: CreateLanguageInput }>,
    reply: FastifyReply
) {
    const currentUser = await getCurrentUser(request)
    if (!currentUser) {
        reply.code(401).send({ message: 'User unauthenticated.' })
        return
    }

    try {
        const language = await prisma.language.create({
            data: {
                name: capitalizeFirstLetter(request.body.name),
                userId: currentUser.userId
            }
        })

        return reply.code(201).send(language)
    } catch (e: unknown) {
        return reply.code(500).send({ message: 'Error while creating language.'})
    }
}

export async function editLanguage(
    request: FastifyRequest<ParamsWithId>,
    reply: FastifyReply
) {}

export async function deleteLanguage(
    request: FastifyRequest<ParamsWithId>,
    reply: FastifyReply
) {}
