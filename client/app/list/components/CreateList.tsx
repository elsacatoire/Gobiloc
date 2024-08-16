'use client'

import React, { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { getCategoryId, getCategoryName, TodoCategory } from '@/app/enums/TodoCategoryEnum';
import { createTodo } from "@/api/services/todoService";

export const CreateList: React.FC = () => {
    const router = useRouter();

    // Local inputs' states
    const [category, setCategory] = useState<string | null>(null);
    const [name, setName] = useState('Todo');
    const [flatShareId, setflatShareId] = useState(1); // TODO :implements get flat id from user
    const [isShared, setIsShared] = useState(false); // TODO BACK
    const [error, setError] = useState<string | null>(null);

    /* ----- SET todo name ----- */
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    /* ----- POST todo ----- */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            console.log('testcategory', category, typeof (category));

            const newTodo = { flat_share: flatShareId, name, category };
            console.log("category=====>", category, typeof (category));

            console.log("newTodo=>", newTodo);
            const response = await createTodo(newTodo);
            router.push(`/list/${response.id}`);
        } catch (error: any) {
            setError(error.message); // TODO: Display errors on the page
        }
    };

    const handleCategoryChange = (value: string) => {
        const selectedCategoryId = getCategoryId(value as TodoCategory);
        console.log('selectedCategoryId', selectedCategoryId, typeof (selectedCategoryId));

        setCategory(selectedCategoryId);
    };

    const handleIsSharedChange = (event: React.FormEvent<HTMLDivElement>) => {
        const selectedValue = (event.target as HTMLDivElement).getAttribute('data-value');
        const booleanValue = selectedValue === "true";
        setIsShared(booleanValue);
    };

    /* ----- Render of my beautiful form ----- */
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>
                    <Button variant="secondary">
                        <Plus className="mr-2 h-4 w-4" />Todo
                    </Button>
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Créer une liste</DialogTitle>
                        <DialogDescription>
                            Créé ta liste partagée ou personnelle pour gérer la colloc
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-[230px]">
                                    <SelectValue placeholder={category !== null ? getCategoryName(parseInt(category)) : 'Choisir un type'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(TodoCategory).map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Titre
                            </Label>
                            <Input
                                id="todo-title"
                                className="col-span-3"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="scope" className="text-right">
                                Pour
                            </Label>
                            <div className="col-span-3">
                                <ToggleGroup type="single" variant="outline" onChange={handleIsSharedChange}>
                                    <ToggleGroupItem value='false' data-value='false'>Perso</ToggleGroupItem>
                                    <ToggleGroupItem value='true' data-value='true'>Toustes</ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Créer la liste</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
