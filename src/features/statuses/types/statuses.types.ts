export interface Status {
    id?: string;
    name: {
        ru: string;
        en: string;
    };
    type: 'logistics' | 'payment';
    image: string;
    color: string;
    bg_color: string;
    role: string;
    role_id: number | string;
    edit_invoice: boolean;
    required_dimension: boolean;
    choose_logistics: boolean;
    required_payment: boolean;
    order_column?: number | string;
}

export interface StatusListProps {
    statuses: Status[] | undefined;
    onEditStatus: (id: string) => void;
}

export interface StatusSortableRowProps {
    id: string;
    status: Status;
    onEditStatus: (id: string) => void;
}