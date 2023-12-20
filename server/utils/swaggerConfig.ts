const swaggerConfig = {
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'auth', description: 'authentication related end-points' },
            { name: 'todo', description: 'todo related end-points' },
            { name: 'category', description: 'todo category related end-points' }
        ],
        definitions: {

        },
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header'
            }
        },
    }
}

export default swaggerConfig;