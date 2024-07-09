import ProducerCountry from "@/components/producerCountries/components/producerCountry";
import {Dispatch} from "react";

interface ICountry {
    id: number;
    name: string;
    image: [];
    image_url: string;
}

interface IAddOrUpdateProducerCountryTypes {
    opened: boolean;
    open: () => void;
    close: () => void;
    editValues: ICountry | undefined;
    setEditValues: Dispatch<React.SetStateAction<ICountry | undefined>>;
}

interface IProducerCountryTypes {
    country: ICountry;
    open: () => void;
    setEditValues: Dispatch<React.SetStateAction<ICountry | undefined>>;
}