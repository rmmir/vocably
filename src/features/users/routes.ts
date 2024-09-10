import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from './schema'
import { authenticateUserHandler, createUserHandler } from './handlers'

export async function userRoutes(server: FastifyInstance) {
    server.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: 'users/ route hit' })
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
        createUserHandler
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
        authenticateUserHandler
    )

    server.delete('/logout', () => {})
}
