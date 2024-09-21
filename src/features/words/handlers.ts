import { FastifyReply, FastifyRequest } from "fastify";
import { ParamsWithId } from "../../models/params";

export async function getWords(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: 'words/ route hit' })
}

export async function getWordById(request: FastifyRequest<ParamsWithId>, reply: FastifyReply) {
    const { id } = request.params
    reply.send({ message: `words/${id} route hit` })
}

export async function createWord(request: FastifyRequest, reply: FastifyReply){

}

export async function editWord(request: FastifyRequest<ParamsWithId>, reply: FastifyReply) {

}

export async function deleteWord(request: FastifyRequest<ParamsWithId>, reply: FastifyReply) {

}