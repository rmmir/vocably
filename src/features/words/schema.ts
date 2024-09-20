import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const wordTypeList = [
    'Substantive',
    'Verb',
    'Adjective',
    'Pronoun',
    'Adverbs',
    'Preposition',
    'Conjunction',
    'Interjection',
]

const createWordSchema = z.object({
    englishWord: z.string({
        required_error: 'English word is required',
        invalid_type_error: 'English word must be a string',
    }),
    foreignWord: z.string({
        required_error: 'Foreign word is required',
        invalid_type_error: 'Foreign word must be a string',
    }),
    englishExample: z.optional(z.string()),
    foreignExample: z.optional(z.string()),
    wordType: z.enum(["Any", ...wordTypeList]).default('Any'),
})

const createWordReplySchema = z.object({
    id: z.string()
})

const editWordSchema = z.object({
    englishWord: z.string(),
    foreignWord: z.string(),
    englishExample: z.string(),
    foreignExample: z.string(),
    wordType: z.enum(["Any", ...wordTypeList]).default('Any'),
    score: z.number(),
})

const editWordReplySchema = z.object({
    id: z.string()
})

export type CreateWordInput = z.infer<typeof createWordSchema>
export type EditWordInput = z.infer<typeof editWordSchema>
export const { schemas: wordSchemas, $ref } = buildJsonSchemas({
    createWordSchema,
    createWordReplySchema,
    editWordSchema,
    editWordReplySchema,
})