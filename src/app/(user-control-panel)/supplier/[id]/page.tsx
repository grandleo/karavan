'use client'

import {NumberInput, Table, TextInput} from "@mantine/core";
import {useGetAllProductsQuery} from "@/store/api/admin/products.api";
import {Controller, useForm} from "react-hook-form";
import {useAddPriceWarehouseProductMutation, useAddQtyWarehouseProductMutation} from "@/store/api/warehouses.api";


const PriceInput = ({id, price}: any) => {

    const {
        handleSubmit,
        control,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: id,
            price: price ?? '',
        }
    });

    const [addPriceProduct] = useAddPriceWarehouseProductMutation();

    const onSubmit = (data: any) => {
        // Здесь вы можете отправить данные формы, например, на сервер
        addPriceProduct(data);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        rightSectionPointerEvents="none"
                        rightSection="P"
                        placeholder="0"
                        value={field.value}
                        onKeyDown={handleKeyDown}
                        onChange={(event) => {
                            field.onChange(event.currentTarget.value);
                        }}
                    />
                )}
                name="price"
            />
        </form>
    )
}

const QtyInput = ({id, qty}: any) => {

    const {
        handleSubmit,
        control,
        setError,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: id,
            qty: qty ?? '',
        }
    });

    const [addQtyProduct] = useAddQtyWarehouseProductMutation();

    const onSubmit = (data: any) => {
        // Здесь вы можете отправить данные формы, например, на сервер
        addQtyProduct(data);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="0"
                        value={field.value}
                        onKeyDown={handleKeyDown}
                        onChange={(event) => {
                            field.onChange(event.currentTarget.value);
                        }}
                    />
                )}
                name="qty"
            />
        </form>
    )
}

export default function Page({ params }: { params: { id: string } }) {

    const {data} = useGetAllProductsQuery('');

    return (
        <>
            <div>ID склада: {params.id}</div>
            <Table.ScrollContainer minWidth={500}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>№</Table.Th>
                            <Table.Th>Наименование</Table.Th>
                            <Table.Th>На складе</Table.Th>
                            <Table.Th>Цена</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data?.map((product: any, index: number) => {
                            return (
                                <Table.Tr key={product.id}>
                                    <Table.Td>{index+1}</Table.Td>
                                    <Table.Td>{product.name}</Table.Td>
                                    <Table.Td>
                                        <QtyInput id={product.id} qty={product.qty}/>
                                    </Table.Td>
                                    <Table.Td>
                                        <PriceInput id={product.id} price={product.price}/>
                                    </Table.Td>
                                </Table.Tr>
                            )
                        })}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    )
}