import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useAddProductForSupplierStockMutation} from "@/store/api/supplier/stockSupplier.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {NumberInput} from "@mantine/core";

const QtyInputStock = ({id, qty}: any) => {
    const {selectedWarehouse} = useSelector(getSupplierStock);
    const [valueQty, setValueQty] = useState<string | number>(0);

    useEffect(() => {
        setValueQty(qty)
    }, [qty]);

    const [addProductForStock] = useAddProductForSupplierStockMutation();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            product_id: id,
            qty: valueQty ?? 0,
        }
    });

    const onChangeInput = (qtyInput: number) => {
        setValueQty(qtyInput);
        setValue('qty', qtyInput);
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
                        value={valueQty}
                        min={0}
                        max={9999}
                        onChange={onChangeInput}
                    />
                )}
                name="qty"
            />
        </form>
    )
}

export default QtyInputStock;