import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createWordSchema = z.object({
    englishWord: z.string(),
    foreignWord: z.string(),
    englishExample: z.optional(z.string()),
    foreignExample: z.optional(z.string()),
    wordType: z.enum([
        'Substantive',
        'Verb',
        'Adjective',
        'Pronoun',
        'Adverbs',
        'Preposition',
        'Conjunction',
        'Interjection',
        'Any'
    ]).default('Any'),
})
