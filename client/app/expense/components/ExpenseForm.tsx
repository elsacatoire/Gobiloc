import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import type { Expense } from '@/types/ExpenseType';
import { Plus } from "lucide-react";
import type React from 'react';
import { useState } from 'react';

type ExpenseFormProps = {
    onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddExpense({ name, amount: Number.parseFloat(amount), date: new Date(date) });
        setName('');
        setAmount('');
        setDate('');
    };

    return (
        <Card>
            <CardContent className='p-3'>
                <form onSubmit={handleSubmit} className='flex gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Input
                            type="text"
                            placeholder="Nom de la dépense"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div className='flex gap-1'>
                            <Input
                                type="number"
                                placeholder="Montant"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='flex mt-auto self-end'>
                        <Button type="submit" size="icon">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>

    );
}

export default ExpenseForm;
