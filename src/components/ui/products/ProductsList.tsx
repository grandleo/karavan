import NoProducts from "@/components/ui/products/NoProducts";
import {useDeleteProductMutation, useGetProductsQuery} from "@/store/api/admin/products.api";
import {ActionIcon, Box, Flex, Image, LoadingOverlay, Menu, rem, ScrollArea, Text} from "@mantine/core";
import classes from "./productsList.module.css";
import {IconDotsVertical, IconPencil, IconTrash} from "@tabler/icons-react";
import React from "react";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {modals} from "@mantine/modals";
import {useSelector} from "react-redux";
import {getCategoriesState} from "@/store/slices/categorySlice";
import ProductForm from "@/components/ui/products/ProductForm";
import {useActions} from "@/hooks/useActions";
import {useDisclosure} from "@mantine/hooks";

interface IProduct{
    id: number;
    name: string;
}

interface Props {
}

const ProductsList = ({}: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {selectedCategory} = useSelector(getCategoriesState);
    const {data: products = [], isLoading} = useGetProductsQuery(selectedCategory);

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {products?.length === 0 ? <NoProducts opened={opened} open={open} close={close}/> :
                    <>
                        <ScrollArea className={classes.productsListWrapper}>
                            <ProductForm showButton={true} opened={opened} open={open} close={close}/>
                            <Products products={products} open={open} />
                        </ScrollArea>
                    </>
                }
            </Box>
        </>
    )
}

const Products = ({products, open}: any) => {

   return (
       <>
           <Box className={classes.productsList}>
               {products?.map((item: IProduct, index: number) => {
                   return (
                       <ProductItem key={index} product={item} open={open}/>
                   )
               })}
           </Box>
       </>
   )
}

const ProductItem = ({product, open}: any) => {
    const [deleteProduct]= useDeleteProductMutation();
    const {setProductId} = useActions();

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Удалить товар ?',
            centered: true,
            children: (
                <Text size="sm">
                    Вы собираетесь удалить товары в данный момент может быть выставлен поставшиком либо быть в корзине у клиента. Что может привести к непредвиденным ситуациям.
                </Text>
            ),
            labels: { confirm: 'Удалить', cancel: "Я передумал" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteProduct(product.id).unwrap()
                .then((payload) => SuccessNotifications(payload))
                .catch((error) => ErrorNotifications(error))
        });

    return (
        <>
            <Box className={classes.productItem}>
                <Flex>
                    <Flex gap={5}>
                        {product.country_icon && (
                            <Image src={product.country_icon} width={18} height={18} fit="contain" alt={product.name}/>
                        )}
                        <Box className={classes.productItemName}>
                            <Text>{product.name}</Text>
                        </Box>
                    </Flex>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings" className={classes.itemMenu}>
                                <IconDotsVertical/>
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                                       onClick={() => {
                                           setProductId(product.id)
                                           open()
                                       }}
                            >
                                Редактировать
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                onClick={openDeleteModal}
                            >
                                Удалить
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Flex>
                <Flex align="center" gap={10}>
                    <Box className={classes.specificationItem}><Text>Арт: {product.article}</Text></Box>

                    {product.specifications_to_card?.map( (specification, index) => {
                        return (
                            <Box key={index} className={classes.specificationItem}><Text>{specification.label}: {specification.value}</Text></Box>
                        )
                    } )}
                </Flex>
            </Box>
        </>
    )
}

export default ProductsList