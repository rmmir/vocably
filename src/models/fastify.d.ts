import 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>
    }

    interface FastifyRequest {
        user: JwtPayload
        jwt: JWT
    }
}

interface JwtPayload {
    userId: string
    username: string
}
