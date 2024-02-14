interface LogisticRowTypes {
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
    "position": string;
    "company_id": number;
    "warehouses_count": number;
    company: ICompany
}

interface ICompany {
    "id": number;
    "inn": string;
    "full_with_opf": string;
    "short_with_opf": string;
    "full": string;
    "short": string;
}