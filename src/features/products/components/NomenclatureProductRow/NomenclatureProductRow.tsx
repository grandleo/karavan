import {ActionIcon, Table, Text} from "@mantine/core";
import classes from "./NomenclatureProductRow.module.css";
import {IconAdjustments, IconCopy, IconPencilMinus, IconTrash} from "@tabler/icons-react";

interface NomenclatureProductRowProps {

}

const NomenclatureProductRow = ({product, handleProductEdit}: NomenclatureProductRowProps) => {
    return (
        <Table.Tr>
            <Table.Td>1</Table.Td>
            <Table.Td>
                <Text className={classes.productName}>
                    {product.name}
                </Text>
                <Text className={classes.productArticle}>
                    Артикул: {product.article}
                </Text>
            </Table.Td>
            <Table.Td>
                <ActionIcon variant="white" color="rgba(0, 0, 0, 1)" aria-label="Settings" onClick={() => handleProductEdit(product.id)}>
                    <IconPencilMinus stroke={2} />
                    {/*<IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />*/}
                </ActionIcon>
                <ActionIcon variant="white" color="rgba(0, 0, 0, 1)" aria-label="Settings">
                    <IconCopy stroke={2} />
                </ActionIcon>
                <ActionIcon variant="white" color="red" aria-label="Settings">
                    <IconTrash stroke={2} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    )
}

export default NomenclatureProductRow;