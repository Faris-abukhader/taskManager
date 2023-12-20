import { FastifyReply, FastifyRequest } from 'fastify'
import type {
    CreateNewTodoCategoryParams,
    UpdateOneTodoCategoryParams,
    DeleteOneTodoCategoryParams,
    GetOneCategoryTodoListParams,
} from './todoCategory.schema'

import {
    createOneTodoCategoryService,
    updateOneTodoCategoryService,
    deleteOneTodoCategoryService,
    getOneCategoryTodoListService,
    getOneUserTodoCategoryListService
} from './todoCategory.service'
import { getUserId } from '../auth/auth.service'

export const createNewTodoCategoryHandler = async (
    request: FastifyRequest<{
        Body: Pick<CreateNewTodoCategoryParams, 'title'>
    }>,
    reply: FastifyReply) => {
    const { body, headers } = request
    try {

        // getting the user id from secret header
        const userSecret = headers.secret as string

        const userId = getUserId(userSecret)

        const newTodoCategory = await createOneTodoCategoryService({ ...body, userId })

        return reply.code(200).send(newTodoCategory)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}

export const updateOneTodoCategoryHandler = async (
    request: FastifyRequest<{
        Body: Pick<UpdateOneTodoCategoryParams, 'title'>,
        Params: Pick<UpdateOneTodoCategoryParams, 'id'>
    }>,
    reply: FastifyReply) => {
    const { body, params } = request

    try {

        const targetTodo = await updateOneTodoCategoryService({ ...body, id: params.id })

        return reply.code(200).send(targetTodo)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}


export const deleteOneTodoCategoryHandler = async (
    request: FastifyRequest<{
        Params: DeleteOneTodoCategoryParams
    }>,
    reply: FastifyReply) => {
    const { params } = request

    try {

        const result = await deleteOneTodoCategoryService(params)

        return reply.code(200).send(result)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }

}

export const getOneUserTodoCategoryListHandler = async (
    request: FastifyRequest,
    reply: FastifyReply) => {
    const { headers } = request

    try {

        // getting the user id from secret header
        const userSecret = headers.secret as string

        const userId = getUserId(userSecret)

        const categoryList = await getOneUserTodoCategoryListService({ userId })

        return reply.code(200).send(categoryList)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}


export const getOneTodoCategoryTodoListHandler = async (
    request: FastifyRequest<{
        Params: GetOneCategoryTodoListParams
    }>,
    reply: FastifyReply) => {
    const { params } = request

    try {

        const todoList = await getOneCategoryTodoListService(params)

        return reply.code(200).send(todoList)

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e)
    }
}
