import NextImage from 'next/image';
import {Image, Text, Table, Flex, Tooltip} from "@mantine/core";
import {PriceInput, QuantityInput} from "@/components/stock/inpunts";
import {FormProvider, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useUpdateProductToSupplierStockMutation} from "@/store/api/supplier/stockSupplier.api";

const SupplierStockItem = ({index, item}: SupplierStockItemTypes) => {
    if (!item) return null

    const [updateProductToSupplierStock] = useUpdateProductToSupplierStockMutation()

    const methods = useForm({
        defaultValues: {
            id: item.id || '',
            quantity: item.qty || '',
            price: item.new_price ? item.new_price : item.price || '',
        }
    });

    const handleUpdate = () => {
        methods.handleSubmit((data) => {
            updateProductToSupplierStock(data).unwrap().then((payload) => {
                SuccessNotifications(payload)
            }).catch((error) => ErrorNotifications(error));
        })();
    }

    return (
        <>
            <FormProvider {...methods}>
                <Table.Tr>
                    <Table.Td>{index}</Table.Td>
                    <Table.Td>
                        <Flex
                            align="center"
                            gap="8"
                        >
                            <Tooltip label={item.product.country.name}>
                                <Image
                                    component={NextImage}
                                    src={item.product.country.image_url}
                                    alt={item.product.country.name}
                                    width={20}
                                    height={20}
                                    fit="contain"
                                />
                            </Tooltip>
                            <Text>{item.product.name}</Text>
                        </Flex>
                    </Table.Td>
                    <Table.Td>
                        <QuantityInput
                            width={100}
                            handleUpdate={handleUpdate}
                        />
                    </Table.Td>
                    <Table.Td>
                        <PriceInput
                            new_price={Number(item.new_price)}
                            width={120}
                            handleUpdate={handleUpdate}
                        />
                    </Table.Td>
                </Table.Tr>
            </FormProvider>
        </>
    )
}

export default SupplierStockItem;