import {Dispatch} from "react";

interface CategoryFormProps {
    opened: boolean;
    close: () => void;
    productSpecifications: ISpecificationTypes[];
}

interface CategoriesTreeProps {
    categories: ICategoryTypes[];
    activeCategory: ICategoryTypes | undefined;
    setActiveCategory: Dispatch<React.SetStateAction<ICategoryTypes | undefined>>;
    productSpecifications: ISpecificationTypes[];
}

interface ICategoryTypes {
    id: number;
    name: string;
    subcategories?: ICategoryTypes[];
    categorySpecifications?: ICategorySpecificationTypes[];
    parent_id?: number;
    required_period_validity?: boolean;
    order_column?: number;
}

interface ICategorySpecificationTypes {
    category_id: number;
    specification_id: number;
    trading_feature: number;
    order_column: number;
}

interface SelectedSpecificationProps {

}

interface ISpecificationTypes {

}

interface CategorySpecificationsProps {
    productSpecifications: ISpecificationTypes[]
}