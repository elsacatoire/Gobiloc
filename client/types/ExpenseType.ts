export type ExpenseType = {
    description: string,
    budget: number,
    amount: string,
    date: Date,
    user: string,
    id: number,
    username: string
}

export type ExpenseDTO = {
    budget: number,
    description: string,
    amount: number,
    date: Date,
    user: number
}