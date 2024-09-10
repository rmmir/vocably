import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import fjwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'

import { userRoutes } from './features/users/routes'
import { userSchemas } from './features/users/schema'

const app = fastify({ logger: true })

app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

// JWT & Cookies setup
app.register(fjwt, { secret: process.env.JWT_SECRET || 'fallback' })
app.addHook('preHandler', (request: FastifyRequest, reply: FastifyReply, done) => {
     request.jwt = app.jwt
     done()
})
app.register(fCookie, { secret: process.env.COOKIE_SECRET || 'fallback', hook: 'preHandler'})

// Routes
app.register(userRoutes, { prefix: 'v1/users' })

// Schemas
for (let schema of [...userSchemas]) {
    app.addSchema(schema)
}