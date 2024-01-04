export interface CategoriesTreeProps {
    categories: ICategory[],
}

export interface CategoryItemProps {
    category: ICategory
}

interface ICategory {
    id: number,
    name: string,
    subcategories: ICategory[],
}