import {SupplierStockItem} from "@/components/stock";
import {ActionIcon, Box, Drawer, Flex, Image, Modal, Table, Text, Tooltip} from "@mantine/core";
import NextImage from "next/image";
import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/stock/styles.module.css";
import {useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {useApproveP2pBidMutation, useLazyFetchP2pBidsQuery} from "@/store/api/supplier/stockSupplier.api";
import {IconCheck, IconGavel} from "@tabler/icons-react";

const SupplierStockList = ({products, currency}: SupplierStockListTypes) => {
    const { trans } = useTranslation();
    const [opened, {open, close}] = useDisclosure(false);
    const [openedAuction, { open: openAuction, close: closeAuction }] = useDisclosure(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [triggerP2p, { data: p2pData = []}] = useLazyFetchP2pBidsQuery();
    const [approveP2pBid] = useApproveP2pBidMutation();

    const handleShowInfo = (product) => {
        setCurrentProduct(product);
        open();
    };

    const handleClose = () => {
        setCurrentProduct(null);
        close();
    };

    const openP2pBids = async (id) => {
        try {
            await triggerP2p({ id }).unwrap();
            openAuction(); // Открытие Drawer
        } catch (error) {
            console.error("Error fetching p2p data:", error);
        }
    };

    const approveBid = async (id) => {
        await approveP2pBid({ id });
    }

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
                        </Box>
                        <Box>
                            <Modal.CloseButton />
                        </Box>
                    </Flex>
                    )}
                </Modal.Content>
            </Modal.Root>
            <Drawer opened={openedAuction} onClose={closeAuction} withCloseButton={false} size="lg">
                {p2pData.length > 0 ? (
                <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={1}>№</Table.Th>
                        <Table.Th>Клиент</Table.Th>
                        <Table.Th w={1} ta="center">Сумма</Table.Th>
                        <Table.Th w={1} ta="center" style={{whiteSpace: 'nowrap'}}>Кол-во</Table.Th>
                        <Table.Th w={1} ta="center" style={{whiteSpace: 'nowrap'}}></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                    <Table.Tbody>
                        {p2pData.map((bid, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>{index + 1}</Table.Td>
                                <Table.Td>{bid.client_name}</Table.Td>
                                <Table.Td>{bid.price}</Table.Td>
                                <Table.Td>{bid.qty}</Table.Td>
                                <Table.Td>
                                    <ActionIcon variant="filled" aria-label="Торг" onClick={() => approveBid(bid.id)}>
                                        <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                ) : (
                    <Text>Данные отсутствуют</Text>
                )}
            </Drawer>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={1}>№</Table.Th>
                        <Table.Th>{trans('stock', 'supplier.table.name')}</Table.Th>
                        <Table.Th w={1} ta="center">{trans('stock', 'supplier.table.quantity')}</Table.Th>
                        <Table.Th w={1} ta="center" style={{whiteSpace: 'nowrap'}}>{trans('stock', 'supplier.table.price', {'symbol': currency.prefix || currency.suffix})}</Table.Th>
                        <Table.Th w={1} ta="center" style={{whiteSpace: 'nowrap'}}>Торг</Table.Th>
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
                                auction={openP2pBids}
                            />
                        )
                    })}
                </Table.Tbody>
            </Table>
        </>
    )
}

export default SupplierStockList;