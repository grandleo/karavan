import {SupplierStockItem} from "@/components/stock";
import {ActionIcon, Box, Button, Drawer, Flex, Image, Modal, NumberInput, Table, Text, Tooltip} from "@mantine/core";
import NextImage from "next/image";
import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/stock/styles.module.css";
import {useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {
    useAddMyP2pBidMutation,
    useApproveP2pBidMutation,
    useLazyFetchP2pBidsQuery
} from "@/store/api/supplier/stockSupplier.api";
import {IconCheck, IconGavel} from "@tabler/icons-react";
import {Controller, useForm} from "react-hook-form";

const SupplierStockList = ({products, currency}: SupplierStockListTypes) => {
    const { trans } = useTranslation();
    const [opened, {open, close}] = useDisclosure(false);
    const [openedAuction, { open: openAuction, close: closeAuction }] = useDisclosure(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [triggerP2p, { data: p2pData = []}] = useLazyFetchP2pBidsQuery();
    const [approveP2pBid] = useApproveP2pBidMutation();
    const [addMyP2pBid] = useAddMyP2pBidMutation();

    const [confirmApproveModalOpened, { open: openConfirmApproveModal, close: closeConfirmApproveModal }] = useDisclosure(false);
    const [approveId, setApproveId] = useState(null);

    const handleApproveClick = (id) => {
        setApproveId(id);
        openConfirmApproveModal();
    };

    const confirmApprove = async () => {
        if (approveId) {
            await approveP2pBid({ id: approveId });
            closeConfirmApproveModal();
            setApproveId(null);
        }
    };

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

    const [offerModalOpened, { open: openOfferModal, close: closeOfferModal }] = useDisclosure(false);
    const [offerData, setOfferData] = useState(null);

    const { control, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            bids: [],
        },
    });

    const handleEnterKey = (id, index) => {
        const bidValues = getValues(`bids.${index}`);
        setOfferData({ ...bidValues, id });
        openOfferModal();
    };

    const confirmOffer = async () => {
        if (offerData) {
            await addMyP2pBid({ id: offerData.id, price: offerData.price, qty: offerData.qty });
            closeOfferModal();
            setOfferData(null);
        }
    };

    return (
        <>
            <Modal opened={offerModalOpened} onClose={closeOfferModal} size="sm" zIndex={2000}>
                <Text align="center">Отправить ваш оффер?</Text>
                <Flex justify="center" mt="md">
                    <Button color="green" onClick={confirmOffer}>Отправить</Button>
                    <Button color="red" onClick={closeOfferModal}>Отмена</Button>
                </Flex>
            </Modal>
            <Modal opened={confirmApproveModalOpened} onClose={closeConfirmApproveModal} size="sm" zIndex={2000}>
                <Text align="center">Вы уверены, что хотите подтвердить заявку?</Text>
                <Flex justify="center" mt="md">
                    <Button color="green" onClick={confirmApprove}>Подтвердить</Button>
                    <Button color="red" onClick={closeConfirmApproveModal}>Отмена</Button>
                </Flex>
            </Modal>
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
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={1} rowSpan={2}>№</Table.Th>
                        <Table.Th rowSpan={2}>Клиент</Table.Th>
                        <Table.Th w={1} ta="center" colSpan={2} style={{whiteSpace: 'nowrap'}}>Мой офер</Table.Th>
                        <Table.Th w={1} ta="center" colSpan={2} style={{whiteSpace: 'nowrap'}}>Клиент</Table.Th>
                        <Table.Th w={1} ta="center" style={{whiteSpace: 'nowrap'}} rowSpan={2}>Действие</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th w={1} ta="center">Сумма</Table.Th>
                        <Table.Th w={1} ta="center" style={{whiteSpace: 'nowrap'}}>Кол-во</Table.Th>
                        <Table.Th w={1} ta="center">Сумма</Table.Th>
                        <Table.Th w={1} ta="center" style={{whiteSpace: 'nowrap'}}>Кол-во</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                    <Table.Tbody>
                        {p2pData.map((bid, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>{index + 1}</Table.Td>
                                <Table.Td>{bid.client_name}</Table.Td>
                                <Table.Td>
                                    <Controller
                                        name={`bids.${index}.price`}
                                        control={control}
                                        defaultValue={0} // Если цена отсутствует, ставим 0
                                        render={({ field }) => (
                                            <NumberInput
                                                {...field}
                                                variant="unstyled"
                                                allowNegative={false}
                                                allowDecimal={false}
                                                hideControls={true}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") handleEnterKey(bid.id, index);
                                                }}
                                            />
                                        )}
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <Controller
                                        name={`bids.${index}.qty`}
                                        control={control}
                                        defaultValue={bid.qty || 0} // Если количество отсутствует, ставим 0
                                        render={({ field }) => (
                                            <NumberInput
                                                {...field}
                                                variant="unstyled"
                                                allowNegative={false}
                                                hideControls={true}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") handleEnterKey(bid.id, index);
                                                }}
                                            />
                                        )}
                                    />
                                </Table.Td>
                                <Table.Td>{bid.client_price}</Table.Td>
                                <Table.Td>{bid.client_qty}</Table.Td>
                                <Table.Td>
                                    <ActionIcon variant="filled" aria-label="Торг" onClick={() => handleApproveClick(bid.id)}>
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