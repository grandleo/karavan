import {ActionIcon, Table, Text} from "@mantine/core";
import classes from "./NomenclatureProductRow.module.css";
import {IconAdjustments} from "@tabler/icons-react";

interface NomenclatureProductRowProps {

}

const NomenclatureProductRow = ({}: NomenclatureProductRowProps) => {
    return (
        <Table.Tr>
            <Table.Td>1</Table.Td>
            <Table.Td>
                <Text className={classes.productName}>

                </Text>
                <Text className={classes.productArticle}>

                </Text>
            </Table.Td>
            <Table.Td>
                <ActionIcon variant="white" color="rgba(0, 0, 0, 1)" aria-label="Settings">
                    <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="white" color="rgba(0, 0, 0, 1)" aria-label="Settings">
                    <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="white" color="red" aria-label="Settings">
                    <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    )
}

export default NomenclatureProductRow;