import { Type, Static } from '@fastify/type-provider-typebox'


export const createNewTodoCategorySchema = Type.Object({
    title: Type.String(),
}, { additionalProperties: false })

export const updateOneTodoCategoryBodySchema = Type.Object({
    title: Type.String(),
}, { additionalProperties: false })

export const updateOneTodoCategoryParamSchema = Type.Object({
    id: Type.String(),
}, { additionalProperties: false })

export const deleteOneTodoCategorySchema = Type.Object({
    id: Type.String(),
}, { additionalProperties: false })

export const getOneUserTodoCategorySchema = Type.Object({
    userId: Type.String(),
}, { additionalProperties: false })

export const getOneCategoryTodoListSchema = Type.Object({
    id: Type.String()
}, { additionalProperties: false })

export type CreateNewTodoCategoryParams = Static<typeof createNewTodoCategorySchema> & {
    userId: string
}
export type UpdateOneTodoCategoryParams = {} & Static<typeof updateOneTodoCategoryBodySchema> & Static<typeof updateOneTodoCategoryParamSchema>
export type DeleteOneTodoCategoryParams = Static<typeof deleteOneTodoCategorySchema>
export type GetOneUserTodoCategoryParams = Static<typeof getOneUserTodoCategorySchema>
export type GetOneCategoryTodoListParams = Static<typeof getOneCategoryTodoListSchema>