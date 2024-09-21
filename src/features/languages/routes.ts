import { FastifyInstance } from 'fastify'
import { $ref, CreateLanguageInput } from './schema'
import { createLanguage, deleteLanguage, editLanguage, getLanguageById, getLanguages } from './handlers'
import { ParamsWithId } from '../../models/params'

export async function languageRoutes(server: FastifyInstance) {
    server.get('/', { preValidation: [server.authenticate] }, getLanguages)

    server.get<ParamsWithId>('/:id', { preValidation: [server.authenticate] }, getLanguageById)

    server.post<{ Body: CreateLanguageInput }>(
        '/',
        {
            schema: {
                body: $ref('createLanguageSchema'),
                response: {
                    201: $ref('createLanguageReplySchema'),
                },
            },
            preValidation: [server.authenticate]
        },
        createLanguage
    )

    server.patch<ParamsWithId>(
        '/:id',
        {
            schema: {
                body: $ref('editLanguageSchema'),
                response: {
                    201: $ref('editLanguageReplySchema'),
                },
            },
            preValidation: [server.authenticate]
        },
        editLanguage
    )

    server.delete<ParamsWithId>('/:id', { preValidation: [server.authenticate] }, deleteLanguage)
}
