import NextImage from 'next/image';
import {Image, Text, Table, Flex, Tooltip, ActionIcon} from "@mantine/core";
import {PriceInput, QuantityInput} from "@/components/stock/inpunts";
import {FormProvider, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useUpdateProductToSupplierStockMutation} from "@/store/api/supplier/stockSupplier.api";
import classes from "@/components/stock/styles.module.css";
import {IconGavel} from "@tabler/icons-react";

const SupplierStockItem = ({index, item, showInfo, auction}: SupplierStockItemTypes) => {
    if (!item) return null

    const [updateProductToSupplierStock] = useUpdateProductToSupplierStockMutation()

    const methods = useForm({
        defaultValues: {
            id: item.id || '',
            quantity: item.qty || '',
            price: item.price || '',
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
                            {item?.product.country?.id && (
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
                            )}
                            <Text className={classes.productName} onClick={showInfo}>{item.product.name}</Text>
                        </Flex>

                        {item.product.product_type === 'set' && (
                            <Text className={classes.productArticle}>
                                {item.product.batch_quantity} шт в упаковке
                            </Text>
                        )}
                    </Table.Td>
                    <Table.Td>
                        <QuantityInput
                            width={60}
                            handleUpdate={handleUpdate}
                        />
                    </Table.Td>
                    <Table.Td>
                        <PriceInput
                            new_price={Number(item.new_price)}
                            width={90}
                            handleUpdate={handleUpdate}
                        />
                    </Table.Td>
                    <Table.Td>
                        <ActionIcon variant="filled" aria-label="Торг" onClick={() => auction(item.id)} disabled={item.p2p_bids_count === 0}>
                            <IconGavel style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Table.Td>
                </Table.Tr>
            </FormProvider>
        </>
    )
}

export default SupplierStockItem;