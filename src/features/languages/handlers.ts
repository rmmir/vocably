import { FastifyReply, FastifyRequest } from "fastify";
import { ParamsWithId } from "../../models/params";

export async function getLanguages(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: 'languages/ route hit' })
}

export async function getLanguageById(request: FastifyRequest<ParamsWithId>, reply: FastifyReply) {
    const { id } = request.params
    reply.send({ message: `languages/${id} route hit` })
}

export async function createLanguage(request: FastifyRequest, reply: FastifyReply){

}

export async function editLanguage(request: FastifyRequest<ParamsWithId>, reply: FastifyReply) {

}

export async function deleteLanguage(request: FastifyRequest<ParamsWithId>, reply: FastifyReply) {

}