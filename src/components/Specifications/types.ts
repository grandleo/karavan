import {Dispatch, SetStateAction} from "react";

export interface ISpecification {
    id: number,
    name: string,
    required: number,
    use_product_name: number,
    active: number,
    order_column: number,
    values_count: number,
}

export interface SpecificationItemProps {
    item: ISpecification;
    onOpen: () => void,
    setSpecification: Dispatch<SetStateAction<ISpecification>>;
}