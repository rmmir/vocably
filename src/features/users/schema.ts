import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createUserSchema = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string().min(6),
})

const createUserReplySchema = z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
})

const loginUserSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        })
        .email(),
    username: z
        .string({
            required_error: 'Username is required',
            invalid_type_error: 'Username must be a string',
        })
        .min(6),
    password: z.string().min(6),
})

const loginUserReplySchema = z.object({
    accessToken: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserReplySchema,
    loginUserSchema,
    loginUserReplySchema
})