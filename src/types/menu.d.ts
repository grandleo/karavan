interface IMenuItem {
    id: number;
    name: string;
    url: string;
    icon: string;
    role_id: number;
    parent_id: number;
    dynamic_table: string;
    dynamic_name: string;
    dynamic_user: number;
    order_column: number;
    role: string;
    children: IMenuItem[]
}