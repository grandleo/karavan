interface AddOrUpdateProducerCountryTypes {
    opened: boolean,
    open: () => void,
    close: () => void
}

interface IForm {
    id: number;
    name: string;
    image: File[];
    uploaded_image: string;
}