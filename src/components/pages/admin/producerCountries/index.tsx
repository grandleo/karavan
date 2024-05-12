'use client'

import SimplePage from "@/components/simplePage";
import AddOrUpdateProducerCountry from "./components/addOrUpdateProducerCountry";
import {useGetProducerCountriesQuery, useSetSortProducerCountryMutation} from "@/store/api/admin/producerCountry.api";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";
import {useEffect, useState} from "react";
import {TreeItem} from "@/components/ui/sortableList/TreeItem";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import EmptyData from "@/components/emptyData";
import {useDisclosure} from "@mantine/hooks";
import ProducerCountry from "@/components/pages/admin/producerCountries/components/producerCountry";

const ProducerCountries = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [items, setItems] = useState<ICountry[]>([])
    const {data: countries} = useGetProducerCountriesQuery('');

    const [setSortCountries] = useSetSortProducerCountryMutation();

    useEffect(() => {
        if(countries) {
            setItems(countries);
        }
    }, [countries]);

    const setSort = (ids: {}) => {
        setSortCountries(ids).unwrap().then((payload) => {
            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error))
    }

    return (
        <SimplePage title="Страны производства" headerChildren={() => {
            return (
                <AddOrUpdateProducerCountry opened={opened} open={open} close={close}/>
            )
        }}>
            {items.length > 0 ?
            <TreeSortable items={items} onChange={setItems} onSortEnd={setSort} renderItem={ (item: ICountry) => {
                return (
                    <TreeItem id={item.id}>
                        <ProducerCountry country={item} open={open}/>
                    </TreeItem>
                )
            }} />
                : <><EmptyData height="calc(100vh - 140px)" text="Страны производства не добавлены"/></>
            }
        </SimplePage>
    )
}

export default ProducerCountries;