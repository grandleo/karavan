interface IBotType {
    id?: number | undenfined;
    name: string;
    token: string;
    username_bot: string;
    username_support?: string;
    warehouses?: IWarehouse[]
}