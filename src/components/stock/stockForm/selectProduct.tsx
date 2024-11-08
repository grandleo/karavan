import {Select, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import Link from "next/link";
import classes from "@/components/stock/styles.module.css";
import {useTranslation} from "@/hooks/useTranslation";

const SelectProduct = ({products, setShowRestForm}: SelectProductTypes) => {
    const { trans } = useTranslation();
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
                        label={trans('stock', 'supplier.form.inputs.product')}
                        placeholder={trans('stock', 'supplier.form.placeholders.product')}
                        checkIconPosition="right"
                        searchable
                        nothingFoundMessage={trans('stock', 'supplier.form.search.product')}
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
                    <Text className={classes.productNotFound}>{trans('stock', 'supplier.form.notfound')} <Link href="#">{trans('stock', 'supplier.form.support')}у</Link></Text>
                </>
            )}
        />
    )
}

export default SelectProduct;