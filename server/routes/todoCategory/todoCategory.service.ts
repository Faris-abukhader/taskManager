import { TodoMiniPagination } from '../../constant/Pagination'
import { prisma } from '../../utils/prisma'
import type {
    CreateNewTodoCategoryParams,
    UpdateOneTodoCategoryParams,
    DeleteOneTodoCategoryParams,
    GetOneCategoryTodoListParams,
    GetOneUserTodoCategoryParams
} from './todoCategory.schema'


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
    id: true,
    title: true,
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

export const createOneTodoCategoryService = async (params: CreateNewTodoCategoryParams) => {
    const { userId, title } = params
    try {
        const newCategory = await prisma.todoCategory.create({
            data: {
                owner: {
                    connect: {
                        id: userId
                    }
                },
                title
            },
            select: globalTodoCategorySelect
        })

        return newCategory

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}

export const updateOneTodoCategoryService = async (params: UpdateOneTodoCategoryParams) => {
    const { id, title } = params
    try {
        const targetCategory = await prisma.todoCategory.update({
            where: {
                id
            },
            data: {
                title
            },
            select: {
                id: true,
                title: true,
            }
        })

        return targetCategory

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}

export const deleteOneTodoCategoryService = async (params: DeleteOneTodoCategoryParams) => {
    const { id } = params
    try {

        await prisma.todoCategory.delete({
            where: {
                id,
            }
        })

        return { id }

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}

export const getOneUserTodoCategoryListService = async (params: GetOneUserTodoCategoryParams) => {
    const { userId } = params
    try {
        const todoCategoryList = await prisma.todoCategory.findMany({
            where: {
                ownerId: userId
            },
            select: {
                ...globalTodoCategorySelect,
                todoList: {
                    take: TodoMiniPagination,
                    select: globalTodoSelect
                }
            }
        })

        return todoCategoryList

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}

export const getOneCategoryTodoListService = async (params: GetOneCategoryTodoListParams) => {
    const { id } = params

    try {
        const todoList = await prisma.todoCategory.findUniqueOrThrow({
            where: {
                id,
            },
            select: {
                todoList: {
                    select: globalTodoSelect
                }
            }
        })

        return todoList.todoList

    } catch (err) {
        console.log(err)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
}