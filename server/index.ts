import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import Fastify from 'fastify'
import { todoCategoryRoutes } from './routes/todoCategory/todoCategory.router'
import { todoRoutes } from './routes/todo/todo.router'
import { authRoutes } from './routes/auth/auth.router'
import authMiddleware from './utils/decorators/auth'
import swaggerConfig from './utils/swaggerConfig'

const fastify = Fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

declare module "fastify" {
    export interface FastifyInstance {
        authMiddleware: any;
    }
}

await fastify.register(require('@fastify/swagger'), swaggerConfig)

await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    exposeRoute: true,
})


fastify.register(todoCategoryRoutes, { prefix: 'category' })
fastify.register(todoRoutes, { prefix: 'todo' })
fastify.register(authRoutes, { prefix: 'auth' })

// inject the auth middleware
fastify.decorate('authMiddleware', authMiddleware)

// Run the server!
fastify.listen({ port: 4500 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
    console.log(`Server is now listening on ${address}`)
})