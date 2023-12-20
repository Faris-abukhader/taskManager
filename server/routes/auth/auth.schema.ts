import { Type, Static } from '@fastify/type-provider-typebox'

export const signInSchema = Type.Object({
    name: Type.String(),
}, { additionalProperties: false })

export const authHeaderSchema = Type.Object({
    secret: Type.String(),
}, { additionalProperties: false })


export type SignInParams = Static<typeof signInSchema>
export type AuthHeaderParams = Static<typeof authHeaderSchema>
