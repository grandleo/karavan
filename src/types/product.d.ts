interface IProductItem {
    id: number;
    name: string;
    category_id: number;
    article: string;
    description: string;
    producer_country_data: IProducerCountryData;
    producer_country_id: number;
    supplier_products: ISupplierProductItem[];
    card_specifications: ICardSpecifications[];
    trading_text: string;

    supplier_product_id: number;
    best_price: number;
    new_price: number;
    price: number;
    qty: number;
    price_position: number;
    period_validity: string;
}

interface IProducerCountryData {
    id: number;
    name: string;
    image: string;
    image_url: string;
}

interface ISupplierProductItem {
    id: number;
    product_id: number;
    user_id: number;
    warehouse_id: number;
    qty: number;
    price: number;
    new_price: number;
    period_validity: string;
}

interface ICardSpecifications {
    label: string;
    value: string;
}