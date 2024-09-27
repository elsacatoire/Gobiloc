export enum TodoCategory {
	GROCERY = "courses",
	CLEANING = "ménage",
	SHOPPING = "achats",
	TODO = "à faire",
	OTHER = "autre",
}

// Combined Mapping
export const categoryMap: { [key: number]: TodoCategory } = {
	1: TodoCategory.GROCERY,
	2: TodoCategory.CLEANING,
	3: TodoCategory.SHOPPING,
	4: TodoCategory.TODO,
	5: TodoCategory.OTHER,
};

// Function to get a category name by id
export function getCategoryName(categoryId: number | null): string {
	return categoryId !== null
		? categoryMap[categoryId] || TodoCategory.OTHER
		: TodoCategory.OTHER;
}

// Function to get a category id by name
export function getCategoryId(categoryName: TodoCategory): string | null {
	const entry = Object.entries(categoryMap).find(
		([, value]) => value === categoryName,
	);
	return entry ? entry[0] : null;
}
