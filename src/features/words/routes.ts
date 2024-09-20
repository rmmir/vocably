import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from './schema'

interface Params {
    id: string
}

export async function wordRoutes(server: FastifyInstance) {
    server.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: 'words/ route hit' })
    })

    server.get(
        '/:id',
        (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
            const { id } = request.params
            reply.send({ message: `words/${id} route hit` })
        }
    )

    server.post(
        '/create',
        {
            schema: {
                body: $ref('createWordSchema'),
                response: {
                    201: $ref('createWordReplySchema'),
                },
            },
        },
        () => {}
    )

    server.patch(
        '/:id',
        {
            schema: {
                body: $ref('editWordSchema'),
                response: {
                    201: $ref('editWordReplySchema'),
                },
            },
        },
        () => {}
    )

    server.delete('/:id', () => {})
}
