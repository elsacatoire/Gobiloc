type TaskType = {
    id: number,
    check: boolean,
    task: string
}
/* 
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={3}>listes</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
<TableBody>
{error && <p className="text-red-500">{error}</p>}
{todos.length > 0 ? (
    todos.map((todo) => (
        <TableRow key={todo.id}>
            <TableCell colSpan={3} className="font-medium">
                {todo.name}
            </TableCell>
            <TableCell className="flex flex-row h-full">
                <Button variant="ghost" size="icon" onClick={() => handleDeleteTodo(todo.id)}>
                    <Trash2 className="h-5 w-5 justify-center" />
                </Button>
            </TableCell>
        </TableRow>

    ))
) : (
    !error && <p>Aucune liste trouvée.</p>
)}
</TableBody> */