interface IProduct {
    id: number;
    name: string;
    category_id: number;
    article: string;
    description: string;
    producer_country_id: number;
    country: ICountry;
}

interface ICountry {
    id: number;
    name: string;
    image: string;
    image_url: string;
}

interface ISupplierProduct {
    id: number;
    product_id: number;
    user_id: number;
    warehouse_id: number;
    qty: number;
    price: number | null;
    new_price: number | null;
    period_validity: string;
    product: IProduct;
}

interface SupplierStockListTypes {
    products: ISupplierProduct[];
}