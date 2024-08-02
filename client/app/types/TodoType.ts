type TodoType = {
    category_id: null | number;
    flat_share_id: number;
    id: number;
    name: string;
    updateDate: string;
    tasks: TaskType[]
}

type TodoDTO = {
    flat_share: number;
    name: string;
    category: null | number;
}
