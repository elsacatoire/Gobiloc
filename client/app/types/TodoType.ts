export type TodoType = {
    category_id: null | number;
    flat_share_id: number;
    id: number;
    name: string;
    updateDate: string;
    tasks: TaskType[]
}

export type TodoDTO = {
    flat_share: number;
    name: string;
    category: null | string;
}

export const emptyTodo: TodoType = {
    category_id: null,
    flat_share_id: 0,
    id: 0,
    name: 'emptyTodo not uploaded',
    updateDate: new Date().toISOString(),
    tasks: [],
}

export const errorTodo: TodoType = {
    category_id: null,
    flat_share_id: 0,
    id: 0,
    name: 'error',
    updateDate: new Date().toISOString(),
    tasks: [],
}
