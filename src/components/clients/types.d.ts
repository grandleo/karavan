interface ISupplierClient {
    id: number;
    name: string;
    company: string;
    phone: string;
    chat_id: string;
    status_id: string;
}

interface SupplierClientsListTypes{
    clients: ISupplierClient[];
    handleChangeStatus: any;
}

interface SupplierClientItemTypes{
    data: ISupplierClient;
    handleChangeStatus: any;
}