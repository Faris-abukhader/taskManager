import { FastifyInstance } from 'fastify'
import {
    signInHandler,
} from './auth.handler'
import {
    signInSchema,
} from './auth.schema'


export const authRoutes = async (fastify: FastifyInstance) => {

    fastify.post('/signIn', {
        schema: {
            tags: ['auth'],
            body: signInSchema,
        },
        handler: signInHandler
    })

}