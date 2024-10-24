export type ExpenseType = {
    description: string,
    amount: number,
    date: Date,
    username: string,
    id: number
}

export type ExpenseDTO = {
    budget: number,
    description: string,
    amount: number,
    date: Date,
    user: number
}