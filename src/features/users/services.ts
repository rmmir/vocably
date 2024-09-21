import { FastifyRequest } from 'fastify'
import { JwtPayload } from '../../models/fastify'

export async function getCurrentUser(
    request: FastifyRequest
): Promise<JwtPayload | null> {
    try {
        await request.jwtVerify()
        const user = request.user as JwtPayload
        console.log(user)
        if (user) {
            return user
        } else {
            return null
        }
    } catch (err) {
        return null
    }
}
