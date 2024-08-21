import {Dispatch} from "react";

interface ISpecificationTypes {
    id: number;
    name: string;
    required: boolean;
    use_product_name: boolean;
    use_product_card: boolean;
    type_choice: string;
    order_column?: number;
    values: IValueTypes[]
}

interface IValueTypes {
    id: number;
    value: string;
    order_column?: number;
}

interface ProductSpecificationProps {
    item: ISpecificationTypes;
    open: () => void;
    setEditValues: Dispatch<React.SetStateAction<ISpecificationTypes | undefined>>;
    handleDeleteSpecification: (id: number) => void;
}

interface ProductSpecificationFormProps {
    opened: boolean;
    open: () => void;
    close: () => void;
    editValues: ISpecificationTypes | undefined;
    setEditValues: Dispatch<React.SetStateAction<ISpecificationTypes | undefined>>;
}

interface ValueSpecificationProps {
    index: number;
    onRemove: () => void;
    canRemove: boolean;
    value: string;
}