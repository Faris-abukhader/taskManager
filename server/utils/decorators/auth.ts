import { FastifyRequest, FastifyReply } from "fastify"
import CryptoJS from "crypto-js"
import { getOneUserByIdService } from "../../routes/auth/auth.service";

export default async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {

    // extranct secret from request headers
    const userSecret = req.headers.secret as string

    if (!userSecret || userSecret == '') reply.code(401).send({ stateCode: 401, message: "No secret found." })


    // Decrypt user secret to get user id
    const bytes = CryptoJS.AES.decrypt(userSecret, process.env.CRYPTO_SECRET!);
    const userId = bytes.toString(CryptoJS.enc.Utf8);

    try {
        await getOneUserByIdService(userId)
    } catch (err) {
        reply.code(401).send({ stateCode: 401, message: "Unauthorized request" })
    }

}

