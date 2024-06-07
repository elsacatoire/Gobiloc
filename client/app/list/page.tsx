import { AddItem } from "@/components/checklists/AddItem"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function Lists() {
    return (
        <div className="container max auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Les TO-DOux listes</CardTitle>
                    <CardDescription>Retrouve, créé, partage tes listes</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
            <div className="p-5 flex justify-center items-center absolute inset-x-0 bottom-10">
                <AddItem />
            </div>
        </div >
    )
}