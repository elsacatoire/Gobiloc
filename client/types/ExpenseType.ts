export type ExpenseType = {
    description: string,
    amount: string,
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