import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/app/components/ui/table';
import { Expense } from '@/types/ExpenseType';
import { Trash2 } from "lucide-react";
import type React from 'react';

type ExpenseListProps = {
    expenses: Expense[],
    onDeleteExpense: (index: number) => void
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {

    return (
        <Card>
            <CardContent className='p-3'>
                {expenses.length < 1 ? (
                    <p>Il n'y a pas encore de données</p>
                ) :
                    (
                        <Table className="w-full">
                            <TableBody>
                                {expenses.map((expense, index) => (
                                    <TableRow key={index} className='w-full'>
                                        <TableCell className='font-semibold w-1/3'>
                                            {expense.name}
                                        </TableCell>
                                        <TableCell className='w-1/3'>
                                            {expense.amount}€
                                        </TableCell>
                                        <TableCell className='w-1/3'>
                                            <span className='text-slate-700 text-xs'>{expense.date.toLocaleDateString()}</span>
                                        </TableCell>
                                        <TableCell className='w-auto'>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => onDeleteExpense(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                }
            </CardContent>
        </Card>
    )
};

export default ExpenseList;
