import { TodoMiniPagination } from '../../constant/Pagination'
import { prisma } from '../../utils/prisma'
import type {
    SignInParams,
} from './auth.schema'

import CryptoJS from "crypto-js"

export const signInService = async (params: SignInParams) => {
    console.log({ params })
    try {
        const newUser = await prisma.user.create({
            data: {
                ...params
            },
            select: {
                id: true,
            }
        })


        // Encrypt the user id
        const secret_id = CryptoJS.AES.encrypt(newUser.id, process.env.CRYPTO_SECRET!).toString();

        return { secret_id }

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}

export const getOneUserByIdService = async (id: string) => {
    try {
        const targetUser = await prisma.user.findUniqueOrThrow({
            where: {
                id
            }
        })

        return targetUser
    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}


export const getUserId = (headerSecret: string) => {
    const bytes = CryptoJS.AES.decrypt(headerSecret, process.env.CRYPTO_SECRET!);
    const userId = bytes.toString(CryptoJS.enc.Utf8);
    return userId
}

