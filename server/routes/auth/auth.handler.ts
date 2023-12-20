import { FastifyReply, FastifyRequest } from 'fastify'
import type {
    SignInParams,
} from './auth.schema'

import {
    signInService,
} from './auth.service'


export const signInHandler = async (
    request: FastifyRequest<{
        Body: SignInParams
    }>,
    reply: FastifyReply) => {
    const { body } = request

    try {

        const newTodo = await signInService(body)

        return reply.code(200).send(newTodo)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}