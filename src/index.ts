import fastify, { FastifyRequest, FastifyReply } from 'fastify'

import { userRoutes } from './features/users/routes'
import { userSchemas } from './features/users/schema'

const app = fastify({ logger: true })

app.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
    return 'pong\n'
})

app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

// Routes
app.register(userRoutes, { prefix: 'v1/users' })


// Schemas
for (let schema of [...userSchemas]) {
    app.addSchema(schema)
}