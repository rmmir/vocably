import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from './schema'

interface Params {
    id: string;
}

export async function languageRoutes(server: FastifyInstance) {
    server.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: 'languages/ route hit' })
    })

    server.get('/:id',  (request: FastifyRequest<{Params: Params}>, reply: FastifyReply) => {
        const { id } = request.params
        reply.send({ message: `languages/${id} route hit` })
    })

    server.post(
        '/create',
        {
            schema: {
                body: $ref('createLanguageSchema'),
                response: {
                    201: $ref('createLanguageReplySchema'),
                },
            },
        },
        () => {}
    )

    server.patch(
        '/:id',
        {
            schema: {
                body: $ref('editLanguageSchema'),
                response: {
                    201: $ref('editLanguageReplySchema'),
                },
            },
        },
        () => {}
    )

    server.delete('/:id', () => {})
}
