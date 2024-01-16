import {ChangeEvent} from "react";

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
}

export interface SpecificationValuesProps {
    setValue: any,
    id_specification?: number
}

export interface IValue {
    id: number;
    value: string;
}

export interface UpdateSpecificationProps {
    opened: boolean,
    close: () => void
}

export interface ValueItemProps {
    item: IValue,
    removeItem: (id: number) => void,
    inputChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void
}