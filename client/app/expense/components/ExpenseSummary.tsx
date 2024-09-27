import { Card, CardFooter } from '@/app/components/ui/card';
import { Expense } from '@/types/ExpenseType';
import type React from 'react';

type ExpenseSummaryProps = {
    expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <Card>
            <CardFooter className='flex p-3 justify-end font-semibold'>
                <h2>Total des dépenses : <span className='text-teal-800'>{total.toFixed(2)}€</span></h2>
            </CardFooter>
        </Card>
    );
}

export default ExpenseSummary;
