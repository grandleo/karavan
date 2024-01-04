export interface ProductsProps {
    products: IProduct[]
}

export interface ProductProps {
    product: IProduct
}

export interface SelectWarehouseProps {
    warehouses: IWarehouse[]
}

interface IWarehouse {
    id: number,
    address: string,
}

export interface IProduct {
    "id": number,
    "product_id": number,
    "qty": number,
    "price": number,
    "name": string,
    "article": string,
    "description": string
}