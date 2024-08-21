import EmptyData from "@/components/emptyData";
import {ActionIcon, Button, Flex, Paper, ScrollArea, Table, Text, Tooltip} from "@mantine/core";
import Product from "@/components/nomenclature/components/product";
import {useDeleteProductMutation} from "@/store/api/admin/nomenclature.api";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import ProductForm from "@/components/nomenclature/components/productForm";
import {useGetProducerCountriesQuery} from "@/store/api/admin/producerCountry.api";

const ProductsTable = ({products, activeCategory, availableSpecifications}) => {
    const [opened, {open, close}] = useDisclosure(false);
    const [editValues, setEditValues] = useState(null);

    const {data: countries} = useGetProducerCountriesQuery('');

    const transformedCountries = countries?.map(country => {
        return {
            value: String(country.id),
            label: country.name
        };
    });

    const [deleteProduct] = useDeleteProductMutation()

    const handleDeleteProduct = (id: number) => {
        modals.openConfirmModal({
            title: 'Удалить товар ?',
            centered: true,
            children: (
                <Text size="sm">
                    Вы собираетесь удалить товар, вместе с товаром удалятся все выставленные позиции поставщиков.
                </Text>
            ),
            labels: {confirm: 'Удалить', cancel: "Я передумал"},
            confirmProps: {color: 'red'},
            onConfirm: () => deleteProduct(id).unwrap()
                .then((payload) => SuccessNotifications(payload))
                .catch((error) => ErrorNotifications(error))
        });
    }

    const handleAddProductClick = () => {
        if (activeCategory.categorySpecifications.length === 0 || activeCategory.subcategories.length > 0) {
            modals.open({
                title: 'Предупреждение',
                centered: true,
                children: (
                    <Text>
                        Нельзя добавить товар, если у категории нет характеристик либо есть подкатегории.
                    </Text>
                ),
            });
        } else {
            open();
        }
    }

    return (
        <>
            <ProductForm
                activeCategory={activeCategory}
                transformedCountries={transformedCountries}
                availableSpecifications={availableSpecifications}
                editValues={editValues}
                setEditValues={setEditValues}
                opened={opened}
                close={close}
            />
            {products?.length === 0 ? <EmptyData text="Нет добавленых товаров" height="calc(100vh - 140px)" children={() => {
                return (
                    <Button onClick={handleAddProductClick}>Добавить товар</Button>
                )
            }}/> : (
                    <Paper shadow="xs" mb={5}>
                        <Flex justify="flex-end" mb={16}>
                            <Button onClick={open}>Добавить товар</Button>
                        </Flex>

                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>№</Table.Th>
                                    <Table.Th>Наименование</Table.Th>
                                    <Table.Th>Торг. особеность</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {products.map((item, index: number) => {
                                    return (
                                        <Product
                                            key={index}
                                            item={item}
                                            index={index}
                                            open={open}
                                            setEditValues={setEditValues}
                                            handleDeleteProduct={handleDeleteProduct}/>
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Paper>
            )}
        </>
    )

}

export default ProductsTable;