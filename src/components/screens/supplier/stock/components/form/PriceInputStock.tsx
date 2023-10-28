import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";
import {useEffect, useState} from "react";
import {useAddProductForSupplierStockMutation} from "@/store/api/supplier/stockSupplier.api";
import {Controller, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {NumberInput} from "@mantine/core";

const PriceInputStock = ({id, price}: any) => {
    const {selectedWarehouse} = useSelector(getSupplierStock);
    const [valuePrice, setValuePrice] = useState<string | number>(0);

    useEffect(() => {
        setValuePrice(price)
    }, [price]);

    const [addProductForStock] = useAddProductForSupplierStockMutation();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            product_id: id,
            price: valuePrice ?? 0,
        }
    });

    const onChangeInput = (priceInput: number) => {
        setValuePrice(priceInput);
        setValue('price', priceInput);
        onSubmit(getValues())
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
                        max={9999}
                        onChange={onChangeInput}
                        decimalScale={2}
                    />
                )}
                name="price"
            />
        </form>
    )
}

export default PriceInputStock;