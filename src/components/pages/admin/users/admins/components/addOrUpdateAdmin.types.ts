interface AddOrUpdateAdminTypes {
    opened: boolean,
    open: () => void,
    close: () => void
}

interface IForm {
    id: number;
    name: string;
    full_name: string;
    fio: [],
    email: string;
    phone: string;
}