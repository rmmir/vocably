import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createLanguageSchema = z.object({
    name: z.string(),
})

const createLanguageReplySchema = z.object({
    id: z.string(),
    name: z.string(),
})

const editLanguageSchema = z.object({
    name: z.string(),
})

const editLanguageReplySchema = z.object({
    id: z.string(),
    name: z.string(),
})

export type CreateLanguageInput = z.infer<typeof createLanguageSchema>
export type EditLanguageInput = z.infer<typeof editLanguageSchema>
export const { schemas: languageSchemas, $ref } = buildJsonSchemas({
    createLanguageSchema,
    createLanguageReplySchema,
    editLanguageSchema,
    editLanguageReplySchema,
}, { $id: 'languageSchema' })