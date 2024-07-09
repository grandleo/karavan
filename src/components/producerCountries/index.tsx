'use client'

import SimplePage from "@/components/simplePage";
import AddOrUpdateProducerCountry from "./components/addOrUpdateProducerCountry";
import {useGetProducerCountriesQuery, useSetSortProducerCountryMutation} from "@/store/api/admin/producerCountry.api";
import {useEffect, useState} from "react";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useDisclosure} from "@mantine/hooks";
import EmptyData from "@/components/emptyData";
import {TreeSortable} from "@/components/treeSortable";
import ProducerCountry from "@/components/producerCountries/components/producerCountry";
import {ICountry} from "@/components/producerCountries/types";

const ProducerCountries = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [items, setItems] = useState<ICountry[]>([]);
    const [editValues, setEditValues] = useState<ICountry | undefined>();

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
                <AddOrUpdateProducerCountry opened={opened} open={open} close={close} editValues={editValues} setEditValues={setEditValues}/>
            )
        }}>
            {items.length > 0 ?
            <TreeSortable items={items} onChange={setItems} onSortEnd={setSort} renderItem={ (item: ICountry) => {
                return (
                    <TreeSortable.Item id={item.id}>
                        <ProducerCountry country={item} open={open} setEditValues={setEditValues}/>
                    </TreeSortable.Item>
                )
            }} />
                : <><EmptyData text="Страны производства не добавлены"/></>
            }
        </SimplePage>
    )
}

export default ProducerCountries;