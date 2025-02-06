import {ICurrency} from "@/features/currencies/types/currencies.types";

export interface IOrderCard {
    id: number;
    client_id: number;
    supplier_id: number;
    total_sum: number;
    order_date: string;
    payment_status_image: string;
    delivery_status_name: string;
    warehouse: string;
    currency: ICurrency;
}