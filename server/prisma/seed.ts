import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

    const fakeUser = await prisma.user.create({
        data: {
            email: 'faris@yahoo.com',
            name: 'Faris',
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })