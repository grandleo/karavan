import {ChangeEvent, useEffect, useState} from "react";
import {SortableItem} from "@/components/ui/sortableList/SortableItem";
import {SortableList} from "@/components/ui/sortableList/SortableList";
import ValueSpecificationItem from "@/components/ui/specifications/ValueSpecificationItem";
import {Box, Button} from "@mantine/core";
import { customAlphabet } from 'nanoid/non-secure'
import _ from "lodash";
import classes from "./specifications.module.css";
import {IconPlus} from "@tabler/icons-react";
import {useGetSpecificationValuesQuery} from "@/store/api/admin/specifications.api";

interface IValue {
    id: number;
    value: string;
}

interface Props {
    id_specification: number,
    values?: [];
    onValues?: any;
    valuesItem?: any;
}

const ValuesSpecificationItem = ({onValues, id_specification, valuesItem} : Props) => {
    const nanoid = customAlphabet('1234567890', 16);

    const {data} = useGetSpecificationValuesQuery(id_specification);

    console.log('data', data)

    const [values, setValues] = useState<IValue[]>([{id: Number(nanoid()), value: ""}]);
    const [valuesSpecification, setValuesSpecification] = useState()

    useEffect(() => {
        onValues('values', _.filter(data, (item) => item.value !== ""))
    }, [data]);

    useEffect(() => {
        if(valuesItem && valuesItem.length > 0) setValues(valuesItem);
    }, [valuesItem]);

    const handleAddValue = () => {
        setValues([...values, { id: Number(nanoid()), value: "" }]);
    };

    const handleRemoveValue = (itemId: number) => {
        setValues(
            values.filter(item => item.id !== itemId)
        )
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        if(event){
            const { value }: { value: string } = event.target;

            setValues(values.map(( item) => {
                if (item.id === id) {
                    return { ...item, value: value };
                } else {
                    return item;
                }
            }));
        }
    };

    return (
        <>
            <Button variant="filled" onClick={handleAddValue} className={classes.addValueItemBtn}>
                <IconPlus size={22}/>
            </Button>

            <Box pos="relative">
                <SortableList items={values} onChange={setValues} renderItem={(item, index) => {
                    return (
                        <SortableItem id={item.id}>
                            <ValueSpecificationItem item={item} handleInputChange={handleInputChange} handleRemoveValue={handleRemoveValue}/>
                        </SortableItem>
                    )
                }}/>
            </Box>
        </>
    )
}

export default ValuesSpecificationItem;