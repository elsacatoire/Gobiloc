import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import type { FormEvent } from "react";

interface TaskFormProps {
	newTask: string;
	onTaskChange: (value: string) => void;
	onTaskAdd: (e: FormEvent<HTMLFormElement>) => void;
}

const TaskForm = ({ newTask, onTaskChange, onTaskAdd }: TaskFormProps) => {
	return (
		<form onSubmit={onTaskAdd}>
			<div className="flex flex-row gap-2 md:max-w-xl m-auto">
				<Input
					aria-label="Ajouter une tâche"
					type="text"
					value={newTask}
					onChange={(e) => onTaskChange(e.target.value)}
					placeholder="Nouvelle tâche"
				/>
				<Button className="md:w-1/3" variant="default" type="submit">
					Ajouter
				</Button>
			</div>
		</form>
	);
};

export default TaskForm;
