import {ActionIcon, Table, Text} from "@mantine/core";
import classes from "./NomenclatureProductRow.module.css";
import {IconAdjustments, IconCopy, IconPencilMinus, IconTrash} from "@tabler/icons-react";

interface NomenclatureProductRowProps {

}

const NomenclatureProductRow = ({product, number, handleProductEdit, onDelete, onCopy}: NomenclatureProductRowProps) => {


    return (
        <Table.Tr>
            <Table.Td>{number}</Table.Td>
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
                </ActionIcon>
                <ActionIcon variant="white" color="rgba(0, 0, 0, 1)" aria-label="Settings" onClick={() => onCopy(product.id)}>
                    <IconCopy stroke={2} />
                </ActionIcon>
                <ActionIcon variant="white" color="red" aria-label="Settings" onClick={() => onDelete(product)}>
                    <IconTrash stroke={2} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    )
}

export default NomenclatureProductRow;