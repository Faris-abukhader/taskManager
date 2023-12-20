import { Type, Static } from '@fastify/type-provider-typebox'

export const createNewTodoSchema = Type.Object({
    categoryId: Type.String(),
    content: Type.String(),
    isDone: Type.Boolean(),
    prioerity: Type.Number({ minimum: 1, maximum: 5 })
}, { additionalProperties: false })

export const updateOneTodoSchema = Type.Object({
    userId: Type.String(),
    id: Type.String(),
    content: Type.String(),
    isDone: Type.Boolean(),
    prioerity: Type.Number({ minimum: 1, maximum: 5 })
}, { additionalProperties: false })

export const deleteOneTodoSchema = Type.Object({
    id: Type.String(),
}, { additionalProperties: false })

export type CreateNewTodoParams = Static<typeof createNewTodoSchema> & {
    userId: string
}
export type UpdateOneTodoParams = Static<typeof updateOneTodoSchema>
export type DeleteOneTodoParams = Static<typeof deleteOneTodoSchema>