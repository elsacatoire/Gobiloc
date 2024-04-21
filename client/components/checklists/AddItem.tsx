import * as React from "react"

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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


export const AddItem: React.FC = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Créer une TOut-DOux</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Créer une Tout-Doux</DialogTitle>
                        <DialogDescription>
                            Créé ta liste paratagée ou personnelle pour gérer la colloc
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select>
                                <SelectTrigger className="w-[230px]">
                                    <SelectValue placeholder="choisis un type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {/* <SelectLabel>Type</SelectLabel> */}
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
                                defaultValue="Todo"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="scope" className="text-right">
                                Pour
                            </Label>
                            <div className="col-span-3">
                                <ToggleGroup type="single" variant="outline">
                                    <ToggleGroupItem value="me">Perso</ToggleGroupItem>
                                    <ToggleGroupItem value="all">Toustes</ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Créer la liste</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}