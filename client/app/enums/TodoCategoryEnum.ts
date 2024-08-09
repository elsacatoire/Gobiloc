export enum TodoCategory {
    GROCERY = 'courses',
    CLEANING = 'ménage',
    SHOPPING = 'achats',
    TODO = 'à faire',
    OTHER = 'autre'
}

// Mapping between category_id and TodoCategory
export const categoryMap: { [key: number]: TodoCategory } = {
    1: TodoCategory.GROCERY,
    2: TodoCategory.CLEANING,
    3: TodoCategory.SHOPPING,
    4: TodoCategory.TODO,
    5: TodoCategory.OTHER,
};

// Function to get a category with it's id
export function getCategoryName(categoryId: number | null): string {
    if (categoryId === null || categoryId === undefined) {
        return TodoCategory.OTHER; // Valeur par défaut si null ou undefined
    }
    return categoryMap[categoryId] || TodoCategory.OTHER;
}


export const categoryIdMap: { [key in TodoCategory]: number } = {
    [TodoCategory.GROCERY]: 1,
    [TodoCategory.CLEANING]: 2,
    [TodoCategory.SHOPPING]: 3,
    [TodoCategory.TODO]: 4,
    [TodoCategory.OTHER]: 5,
};


