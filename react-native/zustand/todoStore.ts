import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category, Todo } from '../utils/type';

const USERNAME_KEY = 'username'
const SECRET_KEY = 'secret_key'

export type Store = {
    username: string | undefined
    secret: string | undefined,
    setUsername: (username: string) => void
    setSecret: (secret: string) => void
    initialize: () => void
    isInitialized: boolean
    saveCredentials: () => void
    categories: Category[]
    setCategories: (categories: Category[]) => void
    addCategory: (category: Category) => void
    updateCategory: (category: Category) => void
    deleteCategory: (id: string) => void
    currentCategory: Category | undefined,
    setCurrentCategory: (currentCategory: Category) => void
    createTodo: (categoryId: string, newTodo: Todo) => void
    deleteTodo: (categoryId: string, todoId: string) => void
}

export const useStore = create<Store>((set, get) => ({
    username: undefined,
    secret: undefined,
    currentCategory: undefined,
    isInitialized: false,
    categories: [],
    setUsername(username) {
        set({ username })
    },
    setSecret(secret) {
        set({ secret })
    },
    async saveCredentials() {
        try {
            await AsyncStorage.setItem(USERNAME_KEY, get().username);
            await AsyncStorage.setItem(SECRET_KEY, get().secret);
        } catch (e) {
            // error reading value
            console.log(e)
        }
    },
    async initialize() {
        try {
            const username = await AsyncStorage.getItem(USERNAME_KEY);
            const secret = await AsyncStorage.getItem(SECRET_KEY)
            if (username !== null && secret != null) {
                set({ username, secret })
            }
        } catch (e) {
            // error reading value
            console.log(e)
        } finally {
            set({ isInitialized: true })
        }
    },
    setCurrentCategory(currentCategory) {
        console.log({ currentCategory })
        set({ currentCategory })
    },
    setCategories(categories) {
        set({ categories })
    },
    addCategory(newCategory) {
        set(state => ({ categories: [newCategory, ...state.categories] }))
    },
    updateCategory(category) {
        set(state => ({
            categories: state.categories.map(cat => {
                if (cat.id === category.id) {
                    return {
                        ...category,
                        todoList: cat.todoList
                    }
                }
                return cat
            })
        }))
    },
    deleteCategory(id) {
        set(state => ({
            categories: state.categories.filter(category => category.id !== id)
        }))
    },
    createTodo(categoryId, newTodo) {
        set(state => ({
            categories: state.categories.map(category => {
                if (category.id == categoryId) {
                    return {
                        ...category,
                        _count: { todoList: category._count.todoList + 1 },
                        todoList: [newTodo, ...category.todoList]
                    }
                }
                return category
            })
        }))

        set(state => ({
            currentCategory: { ...state.currentCategory, _count: { todoList: state.currentCategory._count.todoList + 1 }, todoList: [newTodo, ...state.currentCategory.todoList] }
        }))
    },
    deleteTodo(categoryId, todoId) {
        set(state => ({
            categories: state.categories.map(category => {
                if (category.id == categoryId) {
                    return { ...category, todoList: category.todoList.filter(todo => todo.id !== todoId), _count: { todoList: category._count.todoList - 1 } }
                }
                return category
            })
        }))

        set(state => ({
            currentCategory: {
                ...state.currentCategory, _count: { todoList: state.currentCategory._count.todoList - 1 }, todoList: state.currentCategory.todoList.filter(todo => todo.id !== todoId)
            }
        }))
    },
}))