import { TodoMiniPagination } from '../../constant/Pagination'
import { prisma } from '../../utils/prisma'
import type {
    CreateNewTodoParams,
    UpdateOneTodoParams,
    DeleteOneTodoParams,
} from './todo.schema'


export const globalTodoSelect = {
    id: true,
    content: true,
    user: {
        select: {
            name: true,
        }
    },
    createdAt: true,
    category: {
        select: {
            title: true,
        }
    },
    isDone: true,
    prioerity: true,
}

export const globalTodoCategorySelect = {
    owner: {
        select: {
            name: true,
        }
    },
    todoList: {
        select: globalTodoSelect
    },
    _count: {
        select: {
            todoList: true
        },
    }
}

export const createNewTodoService = async (params: CreateNewTodoParams) => {
    const { userId, categoryId, ...restParams } = params
    try {
        const newTodo = await prisma.todo.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                ...restParams
            },
            select: globalTodoSelect
        })

        return newTodo

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}

export const updateOneTodoService = async (params: UpdateOneTodoParams) => {
    const { id, userId, ...restParams } = params
    try {
        const targetTodo = await prisma.todo.update({
            where: {
                id,
                userId
            },
            data: {
                ...restParams
            },
            select: globalTodoSelect
        })

        return targetTodo

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}

export const deleteOneTodoService = async (params: DeleteOneTodoParams) => {
    const { id } = params
    try {
        const targetTodo = await prisma.todo.delete({
            where: {
                id,
            },
            select: {
                id: true,
                categoryId: true,
            }
        })

        return targetTodo

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}