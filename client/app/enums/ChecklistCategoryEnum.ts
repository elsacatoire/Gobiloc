export enum ChecklistCategory {
	GROCERY = "courses",
	CLEANING = "ménage",
	SHOPPING = "achats",
	TASKLIST = "à faire",
	OTHER = "autre",
}

export const categoryMap: { [key: number]: ChecklistCategory } = {
	1: ChecklistCategory.GROCERY,
	2: ChecklistCategory.CLEANING,
	3: ChecklistCategory.SHOPPING,
	4: ChecklistCategory.TASKLIST,
	5: ChecklistCategory.OTHER,
};

// Function to get a category name by id
export function getCategoryName(categoryId: number | null): string {
	return categoryId !== null
		? categoryMap[categoryId] || ChecklistCategory.OTHER
		: ChecklistCategory.OTHER;
}

// Function to get a category id by name
export function getCategoryId(categoryName: ChecklistCategory): string | null {
	const entry = Object.entries(categoryMap).find(
		([, value]) => value === categoryName,
	);
	return entry ? entry[0] : null;
}
