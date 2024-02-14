interface AdminRowTypes {
    user: IUser;
    open: () => void;
}

interface IUser {
    "id": number;
    "surname": string;
    "name": string;
    "patronymic": string;
    "email": string;
    "phone": string;
}