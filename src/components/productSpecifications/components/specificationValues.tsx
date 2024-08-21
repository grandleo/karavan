import {useFieldArray, useFormContext} from "react-hook-form";
import {TreeSortable} from "@/components/treeSortable";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import ValueSpecification from "@/components/productSpecifications/components/valueSpecification";
import {customAlphabet} from "nanoid/non-secure";
import {Button, Flex} from "@mantine/core";
import {IValueTypes} from "@/components/productSpecifications/types";

const SpecificationValues = forwardRef((_, ref) => {
    const {control, setValue, watch} = useFormContext();
    const {append, remove} = useFieldArray({name: 'values', control});
    const nanoid = customAlphabet('1234567890', 16);

    const values = watch('values');
    const [items, setItems] = useState(values);

    useEffect(() => {
        if (values) {
            setItems(values);
        }
    }, [values]);

    useImperativeHandle(ref, () => ({
        resetValues: () => {
            setItems([{id: Number(nanoid()), value: ''}]);
            setValue('values', [{id: Number(nanoid()), value: ''}]);
        }
    }));

    const handleAddValue = () => {
        const newItem = {id: Number(nanoid()), value: ''};
        append(newItem);
        setItems([...items, newItem]);
    };

    const handleRemoveValue = (index: number) => {
        remove(index);
        setItems(items.filter((_: IValueTypes, i: number) => i !== index));
    };

    const handleItemsChange = (newItems: IValueTypes[]) => {
        setItems(newItems);
        setValue('values', newItems);
    };

    return (
        <>
            {items.length > 0 && (
                <TreeSortable items={items} onChange={handleItemsChange} renderItem={(item, index) => {
                    return (
                        <TreeSortable.Item key={item.id} id={item.id}>
                            <ValueSpecification index={Number(index)} value={item.value} onRemove={() => handleRemoveValue(Number(index))} canRemove={items.length > 1}/>
                        </TreeSortable.Item>
                    )
                }}/>
            )}
            <Flex justify="flex-end" mb={16}>
                <Button variant="light" onClick={handleAddValue}>+ значение</Button>
            </Flex>
        </>
    )
})

export default SpecificationValues;