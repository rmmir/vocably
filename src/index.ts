import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import fjwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'

import {
    userRoutes,
    languageRoutes,
    wordRoutes,
    userSchemas,
    languageSchemas,
    wordSchemas,
} from './features/index'

const app = fastify({ logger: true })

app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

// JWT & Cookies setup
app.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.code(401).send({ message: 'Unauthorized' })
        }
    }
)
app.register(fjwt, { secret: process.env.JWT_SECRET || 'fallback' })
app.addHook(
    'preHandler',
    (request: FastifyRequest, reply: FastifyReply, done) => {
        request.jwt = app.jwt
        done()
    }
)
app.register(fCookie, {
    secret: process.env.COOKIE_SECRET || 'fallback',
    hook: 'preHandler',
})

// Routes
app.register(userRoutes, { prefix: 'v1/users' })
app.register(languageRoutes, { prefix: 'v1/languages' })
app.register(wordRoutes, { prefix: 'v1/words' })

// Schemas
const allSchemas = [...userSchemas, ...languageSchemas, ...wordSchemas]

for (let schema of allSchemas) {
    app.addSchema(schema)
}
