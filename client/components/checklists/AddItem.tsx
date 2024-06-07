'use client'

import React, { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const AddItem: React.FC = () => {
    const router = useRouter();

    // Local inputs's states
    const [type, setType] = useState('');
    const [title, setTitle] = useState('Todo');
    const [isShared, setIsShared] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
    };

    const handleIsSharedChange = (value: boolean) => {
        setIsShared(value);
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        console.log("handleSubmit called"); // Debugging line
        e.preventDefault();
        setError(null); // Reinit errors before submitting

        const data = {
            "type": type,
            "title": title,
            "isShared": isShared
        }

        console.log("data : ", data);

        router.push('/list/todo');


        // TODO: implement CREATE TODO
    };

    return (
        <div>
            <Dialog>

                <DialogTrigger asChild>
                    <Button variant="defaultSecondary">
                        <Plus className="mr-2 h-4 w-4" /> Listes
                    </Button>
                    {/* <Button variant="defaultSecondary">Créer une TOut-DOux</Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit} >
                        <DialogHeader>
                            <DialogTitle>Créer une liste</DialogTitle>
                            <DialogDescription>
                                Créé ta liste paratagée ou personnelle pour gérer la colloc
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Type
                                </Label>
                                <Select onChange={handleTypeChange}>
                                    <SelectTrigger className="w-[230px]">
                                        <SelectValue placeholder={type || 'Choisir un type'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="groceries">Courses</SelectItem>
                                            <SelectItem value="houshold">Ménage</SelectItem>
                                            <SelectItem value="shop">Achats</SelectItem>
                                            <SelectItem value="other">Autres</SelectItem>
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
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="scope" className="text-right">
                                    Pour
                                </Label>
                                <div className="col-span-3">
                                    <ToggleGroup type="single" variant="outline" onChange={handleIsSharedChange}>
                                        <ToggleGroupItem value={false}>Perso</ToggleGroupItem>
                                        <ToggleGroupItem value={true}>Toustes</ToggleGroupItem>
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
        </div>
    )
}