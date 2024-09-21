import { FastifyInstance } from 'fastify'
import { $ref } from './schema'
import { ParamsWithId } from '../../models/params'
import {
    createWord,
    deleteWord,
    editWord,
    getWordById,
    getWords,
} from './handlers'

export async function wordRoutes(server: FastifyInstance) {
    server.get('/', { preValidation: [server.authenticate] }, getWords)

    server.get<ParamsWithId>(
        '/:id',
        { preValidation: [server.authenticate] },
        getWordById
    )

    server.post(
        '/create',
        {
            schema: {
                body: $ref('createWordSchema'),
                response: {
                    201: $ref('createWordReplySchema'),
                },
            },
            preValidation: [server.authenticate],
        },
        createWord
    )

    server.patch<ParamsWithId>(
        '/:id',
        {
            schema: {
                body: $ref('editWordSchema'),
                response: {
                    201: $ref('editWordReplySchema'),
                },
            },
            preValidation: [server.authenticate],
        },
        editWord
    )

    server.delete<ParamsWithId>(
        '/:id',
        { preValidation: [server.authenticate] },
        deleteWord
    )
}
