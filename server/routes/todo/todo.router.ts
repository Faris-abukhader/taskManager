import { FastifyInstance } from 'fastify'
import {
    createNewTodoHandler,
    updateOneTodoHandler,
    deleteOneTodoHandler,
} from './todo.handler'
import {
    createNewTodoSchema,
    updateOneTodoSchema,
    deleteOneTodoSchema,
} from './todo.schema'
import { authHeaderSchema } from '../auth/auth.schema'


export const todoRoutes = async (fastify: FastifyInstance) => {

    fastify.post('/', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['todo'],
            headers: authHeaderSchema,
            body: createNewTodoSchema,
        },
        handler: createNewTodoHandler
    })

    fastify.put('/', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['todo'],
            headers: authHeaderSchema,
            body: updateOneTodoSchema,
        },
        handler: updateOneTodoHandler
    })

    fastify.delete('/:id', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['todo'],
            headers: authHeaderSchema,
            params: deleteOneTodoSchema,
        },
        handler: deleteOneTodoHandler
    })
}