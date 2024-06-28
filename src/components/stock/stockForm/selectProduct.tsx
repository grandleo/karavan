import {Select, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import Link from "next/link";
import classes from "@/components/stock/styles.module.css";

const SelectProduct = ({products, setShowRestForm}: SelectProductTypes) => {
    const {control, formState: {errors}} = useFormContext();
    const [items, setItems] = useState<ISelectProduct[]>([]);

    useEffect(() => {
        if (products) {
            setItems(products);
        }
    }, [products]);

    return (
        <Controller
            name="product_id"
            control={control}
            rules={{
                required: "Выберите товар",
            }}
            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                <>
                    <Select
                        label="Товар"
                        placeholder="Выберите товар"
                        checkIconPosition="right"
                        searchable
                        nothingFoundMessage="Ничего не найдено..."
                        data={items}
                        value={value}
                        onBlur={onBlur}
                        onChange={(value) => {
                            onChange(value);
                            setShowRestForm(!!value);
                        }}
                        error={error?.message}
                        mb={5}
                    />
                    <Text className={classes.productNotFound}>Если товар не найден, <Link href="#">обратитесь в поддержку</Link></Text>
                </>
            )}
        />
    )
}

export default SelectProduct;