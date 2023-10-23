import NoProducts from "@/components/ui/products/NoProducts";
import {useDeleteProductMutation, useGetProductsQuery} from "@/store/api/admin/products.api";
import {ActionIcon, Box, LoadingOverlay, Menu, rem, ScrollArea, Text} from "@mantine/core";
import classes from "./productsList.module.css";
import {IconDotsVertical, IconPencil, IconTrash} from "@tabler/icons-react";
import React from "react";
import AddProductItem from "@/components/ui/products/AddProductItem";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {modals} from "@mantine/modals";

interface IProduct{
    id: number;
    name: string;
}

interface Props {
    activeCategory: number;
}

const ProductsList = ({activeCategory}: Props) => {
    const {data: products = [], isLoading} = useGetProductsQuery(activeCategory);

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                {products?.length === 0 ? <NoProducts activeCategory={activeCategory}/> :
                    <>
                        <ScrollArea className={classes.productsListWrapper}>
                            <AddProductItem activeCategory={activeCategory}/>

                            <Products products={products}/>
                        </ScrollArea>
                    </>
                }
            </Box>
        </>
    )
}

const Products = ({products}) => {

   return (
       <>
           <Box className={classes.productsList}>
               {products?.map((item: IProduct, index: number) => {
                   return (
                       <ProductItem key={index} product={item}/>
                   )
               })}
           </Box>
       </>
   )
}

const ProductItem = ({product}: IProduct) => {
    const [deleteProduct]= useDeleteProductMutation()

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
                <Box className={classes.productItemName}>
                    <Text>{product.name}</Text>
                </Box>
                <Box>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings" className={classes.itemMenu}>
                                <IconDotsVertical/>
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                                       onClick={() => {
                                           // setEditCategory(item);
                                           // onOpen();
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
                </Box>
            </Box>
        </>
    )
}

export default ProductsList