import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from './schema'

export async function userRoutes(server: FastifyInstance) {
    server.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: 'user/ route hit' })
    })

    server.post(
        '/register',
        {
            schema: {
                body: $ref('createUserSchema'),
                response: {
                    201: $ref('createUserReplySchema'),
                },
            },
        },
        () => {}
    )

    server.post(
        '/login',
        {
            schema: {
                body: $ref('loginUserSchema'),
                response: {
                    201: $ref('loginUserReplySchema'),
                },
            },
        },
        () => {}
    )

    server.delete('/logout', () => {})
}
