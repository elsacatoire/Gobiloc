import React, { FormEvent, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Import, Pencil } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import router from 'next/router'

const EditList = () => {
    const [newName, setNewName] = useState('')
    const [error, setError] = useState<string | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.patch( // TODO response dans confirm snackbar ?
                'http://localhost:8000/api/todo/1',// TODO not finished
                {},
            );
        } catch {
            setError("An error occured."); // TODO: Diplay erros on the page
        }
        router.push('/list');
    };
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="secondary" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Modifier la liste
                    </DialogTitle>
                </DialogHeader>
                <Label>Editer le nom</Label>
                <Input
                    value={newName}
                    onChange={handleNameChange}
                />
                <DialogFooter>
                    {/* <Button type="submit">OK</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditList