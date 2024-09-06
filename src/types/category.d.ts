interface ICategoryItem {
    id: string | number;
    name: string;
    subcategories: ICategoryItem[];
    required_period_validity: boolean;
    categorySpecifications: ICategorySpecification[]
}

interface ICategorySpecification {
    category_id: number;
    specification_id: number;
    trading_feature: number;
    is_filterable: boolean;
    order_column: number;
    id: number;
    name: string;
    required: number;
    use_product_name: number;
    use_product_card: number;
    active: number;
    type_choice: string;
}