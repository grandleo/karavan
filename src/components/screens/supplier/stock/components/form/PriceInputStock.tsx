import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";
import {useEffect, useState} from "react";
import {useAddProductForSupplierStockMutation} from "@/store/api/supplier/stockSupplier.api";
import {Controller, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {NumberInput} from "@mantine/core";
import classes from "../stock.module.css";
const PriceInputStock = ({id, price, new_price}: any) => {
    const {selectedWarehouse} = useSelector(getSupplierStock);
    const [valuePrice, setValuePrice] = useState<number>(0);

    useEffect(() => {
        setValuePrice(new_price ? new_price : price)
    }, [price, new_price]);

    const [addProductForStock] = useAddProductForSupplierStockMutation();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            product_id: id,
            new_price: valuePrice ?? 0,
        }
    });

    const onChangeInput = (priceInput: number) => {
        setValuePrice(priceInput);
        setValue('new_price', priceInput);
        // onSubmit(getValues())
    }

    const onSubmit = (data: any) => {
        addProductForStock({
            'warehouse_id': selectedWarehouse,
            ...data
        }).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                render={() => (
                    <NumberInput
                        placeholder="0"
                        value={valuePrice}
                        min={0}
                        onChange={onChangeInput}
                        onBlur={() => onSubmit(getValues())}
                        decimalScale={2}
                        className={new_price !== null ? classes.newPrice : ""}
                    />
                )}
                name="new_price"
            />
        </form>
    )
}

export default PriceInputStock;