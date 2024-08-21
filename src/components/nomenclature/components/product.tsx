import {ActionIcon, Menu, rem, Table} from "@mantine/core";
import {IconDotsVertical, IconPencil, IconTrash} from "@tabler/icons-react";
import {ProductNameItem} from "@/components/externalItems";

const Product = ({item, index, handleDeleteProduct, open, setEditValues}) => {

    return (
        <>
            <Table.Tr style={{verticalAlign: 'top'}}>
                <Table.Td>
                    {index+1}
                </Table.Td>
                <Table.Td>
                    <ProductNameItem item={item}/>
                </Table.Td>
                <Table.Td>
                    {item.trading_text}
                </Table.Td>
                <Table.Td>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                                <IconDotsVertical/>
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    setEditValues(item)
                                    open();
                                }}
                            >
                                Редактировать
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                                color="red"
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => handleDeleteProduct(item.id)}
                            >
                                Удалить
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Table.Td>
            </Table.Tr>
        </>
    )
}

export default Product;