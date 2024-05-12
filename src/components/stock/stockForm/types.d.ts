interface ISelectCategory {
    value: string;
    label: string;
    has_children: boolean;
    required_period_validity: boolean;
}

interface SelectSubCategoryTypes {
    index: number;
    categories: ISelectCategory[];
    handleSelectCategory: any;
}

interface ISelectProduct {
    value: string;
    label: string;
}

interface SelectProductTypes {
    products: ISelectProduct[];
}