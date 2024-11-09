import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/components/ui/table";
import type { TaskType } from "@/types/TaskType";
import { Trash2 } from "lucide-react";

type TaskTableProps = {
	tasks: TaskType[];
	onCheckBoxChange: (idToUpdate: number, state: boolean) => void;
	onDeleteTask: (taskId: number) => void;
	onDeleteSelectedTasks: () => void;
	onDeleteAllTasks: () => void;
	selectedTasks: number[];
};

const TaskTable: React.FC<TaskTableProps> = ({
	tasks,
	onCheckBoxChange,
	onDeleteTask,
	onDeleteSelectedTasks,
	onDeleteAllTasks,
	selectedTasks,
}) => {
	return (
		<div>
			<Table className="rounded md:max-w-xl m-auto md:border">
				<TableHeader>
					<TableRow>
						<TableHead>Fait</TableHead>
						<TableHead className="justify-center">Tâche</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="overflow-auto">
					{tasks.map((task) => (
						<TableRow key={task.id}>
							<TableCell className="font-medium">
								<Checkbox
									checked={task.done}
									onCheckedChange={() => onCheckBoxChange(task.id, task.done)}
								/>
							</TableCell>
							<TableCell className="text-left">{task.content}</TableCell>
							<TableCell className="text-right">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => onDeleteTask(task.id)}
								>
									<Trash2 color="darkred" className="h-5 w-5" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="bg-slate-50 rounded-b-lg flex flex-wrap items-center justify-center gap-x-5 gap-y-1 p-3">
				<Button
					variant="default"
					className="flex gap-1"
					onClick={onDeleteSelectedTasks}
					disabled={selectedTasks.length === 0}
				>
					<Trash2 color="white" className="h-5 w-5 m-1 justify-left" />
					<span> Sélection</span>
				</Button>
				<Button
					variant="destructive"
					className="flex gap-1"
					onClick={onDeleteAllTasks}
					disabled={tasks.length === 0}
				>
					<Trash2 color="white" className="h-5 w-5 m-1 justify-left" />
					<span> Tout</span>
				</Button>
			</div>
		</div>
	);
};

export default TaskTable;
