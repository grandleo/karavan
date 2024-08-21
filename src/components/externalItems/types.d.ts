interface CategoryItemProps {
    item: ICategory;
    activeCategory: ICategory | null;
    setActiveCategory: React.Dispatch<React.SetStateAction<ICategoryItem | null>>;
    setEditValues: () => void;
    open?: () => void;
    dragHandle?: boolean;
    showEdit?: boolean;
    onSetSort?: any;
    handleDeleteCategory?: any;
}

interface ICategory {
    id: string | number;
    name: string;
    subcategories: ICategory[];
    required_period_validity: boolean;
}

interface ProductNameItemProps {
    item: IProductItem;
}