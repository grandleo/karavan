import {SupplierStockItem} from "@/components/stock";
import {Box, Flex, Image, Modal, Table, Text, Tooltip} from "@mantine/core";
import NextImage from "next/image";
import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/stock/styles.module.css";
import {useState} from "react";

const SupplierStockList = ({products}: SupplierStockListTypes) => {
    const [opened, {open, close}] = useDisclosure(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleShowInfo = (product) => {
        setCurrentProduct(product);
        open();
    };

    const handleClose = () => {
        setCurrentProduct(null);
        close();
    };

    return (
        <>
            <Modal.Root opened={opened} onClose={handleClose} size="lg">
                <Modal.Overlay/>
                <Modal.Content className={classes.showInfo}>
                    {currentProduct && (
                    <Flex
                        gap={16}>
                        <Image
                            component={NextImage}
                            src="/images/image-not-found.svg"
                            alt="фы"
                            width="185"
                            height="185"
                            fit="contain"
                        />
                        <Box style={{flexGrow: 1}}>
                            <Flex
                                gap="8"
                                className={classes.productInfo}
                            >
                                {currentProduct.product?.country?.id && (
                                    <Tooltip label={currentProduct.product.country.name}>
                                        <Image
                                            component={NextImage}
                                            src={currentProduct.product.country.image_url}
                                            alt={currentProduct.product.country.name}
                                            width="30"
                                            height="20"
                                            fit="contain"
                                        />
                                    </Tooltip>
                                )}
                                <Text className={classes.productName}>{currentProduct.product.name}</Text>
                            </Flex>

                            <Text className={classes.info}>Артикул: <Text span>{currentProduct.product.article}</Text></Text>

                            {currentProduct?.card_specifications.length > 0 && currentProduct.card_specifications.map((spec, idx) => (
                                <Text key={idx} className={classes.info}>{spec.label}: <Text span>{spec.value}</Text></Text>
                            ))}

                            {currentProduct?.trading_text && (
                                <Text className={classes.info}>Торг.особенность: <Text span>{currentProduct.trading_text}</Text></Text>
                            )}
                        </Box>
                        <Box>
                            <Modal.CloseButton />
                        </Box>
                    </Flex>
                    )}
                </Modal.Content>
            </Modal.Root>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={1}>№</Table.Th>
                        <Table.Th>Наименование</Table.Th>
                        <Table.Th w={1} ta="center">Кол-во</Table.Th>
                        <Table.Th w={1} ta="center">Цена ₽</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {products?.map((product, index) => {
                        return (
                            <SupplierStockItem
                                key={product.id}
                                index={index + 1}
                                item={product}
                                showInfo={() => handleShowInfo(product)}
                            />
                        )
                    })}
                </Table.Tbody>
            </Table>
        </>
    )
}

export default SupplierStockList;