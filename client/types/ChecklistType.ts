import type { TaskType } from "./TaskType";

export type ChecklistType = {
	category: number;
	flat_share_id: number;
	id: number;
	name: string;
	updateDate: string;
	tasks: TaskType[];
};

export type ChecklistDTO = {
	flat_share: number;
	name: string;
	category: null | string;
};

export const emptyChecklist: ChecklistType = {
	category: 0,
	flat_share_id: 0,
	id: 0,
	name: "emptyList not uploaded",
	updateDate: new Date().toISOString(),
	tasks: [],
};

export const errorChecklist: ChecklistType = {
	category: 0,
	flat_share_id: 0,
	id: 0,
	name: "error",
	updateDate: new Date().toISOString(),
	tasks: [],
};
