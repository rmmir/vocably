import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export async function userRoutes(server: FastifyInstance) {
    server.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: 'user/ route hit'})
    })

    server.post('/register', () => {})

    server.post('/login', () => {})
    
    server.delete('/logout', () => {})
}