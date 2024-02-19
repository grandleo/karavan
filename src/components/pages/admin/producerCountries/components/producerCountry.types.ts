interface ProducerCountryTypes {
    country: ICountry;
    open: () => void;
}

interface ICountry {
    id: number;
    name: string;
    image: string;
    order_column: number;
}