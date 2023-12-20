export type SignInResponse = { secret_id: string }

export interface User {
    name: string;
}

export interface Todo {
    id: string;
    content: string;
    user: User;
    createdAt: Date;
    category: {
        title: string
    };
    isDone: boolean;
    prioerity: number;
}

export interface Category {
    id: string;
    title: string;
    owner: {
        name: string;
    }
    todoList: Todo[];
    _count: {
        todoList: number
    }
}
