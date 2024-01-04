export interface OrderCardProps {
    order: IOrderCard
}

export interface IOrderCard {
    number_id: number,
    date: string,
    totalAmount: number,
    status: {
        name: string,
        color: string,
        bg_color: string
    },
    delivery_date: string
}

export interface StatusBadgeProps {
    bg_color: string,
    color: string,
    text: string,
}

export interface OrderProps {
    order: IOrder,
}

export interface IOrder {
    number_id: number,
    date: string,
    current_status: ICurrentStatus,
    status_history: [],
    products: IOrderProduct[],
    total_amount: number,
    total_quantity: number,
    weight: number,
    dimensions: string,
    requirement: string,
    delivery_date: string,

    bids: IBids[],
    invoices: [],

    warehouses: IWarehouses,
    contacts: IContacts,

    change_status_text: string,
    change_status: boolean,
    required_dimension: boolean,
    edit_invoice: boolean,

    choose_logistics_block: boolean,
    choose_logistics: boolean,
}

interface ICurrentStatus {
    name: string,
    color: string
}

export interface IOrderProduct {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export interface IStatus {
    name: string,
    active: boolean,
    date: string,
}

interface IBids {
    id: number,
    company: string
    price: number,
    delivery_date: string,
}

export interface BidProps {
    bid: IBids,
    choose_logistics: boolean
}

interface IWarehouses {
    client: string,
    supplier: string
}

interface IContacts {
    client: IContact,
    supplier: IContact
}

interface IContact {
    name: string,
    phone: string,
    company: string
}