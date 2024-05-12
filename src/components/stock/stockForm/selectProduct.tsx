import {Select} from "@mantine/core";
import {useEffect, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";

const SelectProduct = ({products}: SelectProductTypes) => {
    const {control, getValues, formState: {errors}} = useFormContext();
    const [items, setItems] = useState<ISelectProduct[]>([]);

    const [item, setItem] = useState('')

    const product_id = getValues('product_id')

    useEffect(() => {
        if (products) {
            setItems(products);
        }
    }, [products]);

    useEffect(() => {
        if(product_id === undefined){
            setItem('')
        }
    }, [product_id]);

    return (
        <Controller
            name="product_id"
            control={control}
            rules={{
                required: "Выберите товар",
            }}
            render={({field: {onChange, onBlur, value}}) => (
                <Select
                    label="Товар"
                    placeholder="Выберите товар"
                    checkIconPosition="right"
                    searchable
                    nothingFoundMessage="Ничего не найдено..."
                    data={items}
                    value={item ? item : value}
                    onBlur={onBlur}
                    onChange={(value) => {
                        onChange(value);
                    }}
                    error={errors?.product_id?.message ? String(errors?.product_id?.message) : undefined}
                    mb={15}
                />
            )}
        />
    )
}

export default SelectProduct;