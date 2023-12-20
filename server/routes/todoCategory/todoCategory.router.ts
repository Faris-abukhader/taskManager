import { FastifyInstance } from 'fastify'
import {
    createNewTodoCategoryHandler,
    updateOneTodoCategoryHandler,
    deleteOneTodoCategoryHandler,
    getOneTodoCategoryTodoListHandler,
    getOneUserTodoCategoryListHandler
} from './todoCategory.handler'
import {
    createNewTodoCategorySchema,
    deleteOneTodoCategorySchema,
    getOneCategoryTodoListSchema,
    updateOneTodoCategoryParamSchema,
    updateOneTodoCategoryBodySchema,
} from './todoCategory.schema'
import { authHeaderSchema } from '../auth/auth.schema'


export const todoCategoryRoutes = async (fastify: FastifyInstance) => {

    fastify.post('/', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['category'],
            headers: authHeaderSchema,
            body: createNewTodoCategorySchema,
        },
        handler: createNewTodoCategoryHandler
    })

    fastify.put('/:id', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['category'],
            headers: authHeaderSchema,
            params: updateOneTodoCategoryParamSchema,
            body: updateOneTodoCategoryBodySchema,
        },
        handler: updateOneTodoCategoryHandler
    })

    fastify.delete('/:id', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['category'],
            headers: authHeaderSchema,
            params: deleteOneTodoCategorySchema,
        },
        handler: deleteOneTodoCategoryHandler
    })

    fastify.get('/all', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['category'],
            headers: authHeaderSchema,
        },
        handler: getOneUserTodoCategoryListHandler
    })

    fastify.get('/:id', {
        preHandler: [fastify.authMiddleware],
        schema: {
            tags: ['category'],
            headers: authHeaderSchema,
            params: getOneCategoryTodoListSchema,
        },
        handler: getOneTodoCategoryTodoListHandler
    })
}