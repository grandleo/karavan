import {IconPlus} from "@tabler/icons-react";
import {Box, Button} from "@mantine/core";
import {customAlphabet} from "nanoid/non-secure";
import {ChangeEvent, useEffect, useState} from "react";
import {TreeSortable} from "@/components/ui/sortableList/TreeSortable";
import {TreeItem} from "@/components/ui/sortableList/TreeItem";
import ValueItem from "@/components/Specifications/form/ValueItem";
import _ from "lodash";
import {useGetSpecificationValuesQuery} from "@/store/api/admin/specifications.api";
import {IValue, SpecificationValuesProps} from "@/types/specification";
import classes from "../specifications.module.css";

const SpecificationValues = ({setValue, id_specification} : SpecificationValuesProps) => {
    const nanoid = customAlphabet('1234567890', 16);
    const [items, setItems] = useState<IValue[]>([{id: Number(nanoid()), value: ""}]);

    const {data: values} = useGetSpecificationValuesQuery(id_specification);

    useEffect(() => {
        setValue('values', _.filter(items, ({ value }) => !_.isEmpty(value.trim())))
    }, [items]);

    useEffect(() => {
        if(values && values.length > 0) setItems(values)
    }, [values]);

    const addItem = () => {
        setItems([...items, { id: Number(nanoid()), value: "" }]);
    }

    const removeItem = (itemId: number) => {
        setItems(items.filter(item => item.id !== itemId))
    }

    const inputChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        if(event){
            const { value }: { value: string } = event.target;

            setItems(items.map(( item) => {
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
            <Box className={classes.valueItems}>
                <Button onClick={addItem} mb={{ base: 10 }}>
                    <IconPlus style={{ width: '70%', height: '70%', marginRight: '10px' }} stroke={1.5} /> Добавить значение
                </Button>

                <Box pos="relative">
                    <TreeSortable items={items} onChange={setItems} renderItem={(item) => {
                        return (
                            <TreeItem id={item.id}>
                                <ValueItem item={item} removeItem={removeItem} inputChange={inputChange}/>
                            </TreeItem>
                        )
                    }}/>
                </Box>
            </Box>
        </>
    )
}

export default SpecificationValues;