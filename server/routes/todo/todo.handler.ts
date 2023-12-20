import { FastifyReply, FastifyRequest } from 'fastify'
import type {
    CreateNewTodoParams,
    UpdateOneTodoParams,
    DeleteOneTodoParams,
} from './todo.schema'

import {
    createNewTodoService,
    updateOneTodoService,
    deleteOneTodoService,
} from './todo.service'
import { getUserId } from '../auth/auth.service'



export const createNewTodoHandler = async (
    request: FastifyRequest<{
        Body: CreateNewTodoParams
    }>,
    reply: FastifyReply) => {
    const { body, headers } = request

    try {


        const userSecret = headers.secret as string
        const userId = getUserId(userSecret)

        const newTodo = await createNewTodoService({ ...body, userId })

        return reply.code(200).send(newTodo)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}

export const updateOneTodoHandler = async (
    request: FastifyRequest<{
        Body: UpdateOneTodoParams
    }>,
    reply: FastifyReply) => {
    const { body } = request

    try {

        const targetTodo = await updateOneTodoService(body)

        return reply.code(200).send(targetTodo)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}


export const deleteOneTodoHandler = async (
    request: FastifyRequest<{
        Params: DeleteOneTodoParams
    }>,
    reply: FastifyReply) => {
    const { params } = request

    try {

        const result = await deleteOneTodoService(params)

        return reply.code(200).send(result)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }

}