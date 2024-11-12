import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ActionIcon, Table } from "@mantine/core";
import { IconGripVertical, IconPencilMinus } from "@tabler/icons-react";

const CurrencySortableRow = ({ id, currency, onEditCurrency }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Table.Tr ref={setNodeRef} style={style}>
            <Table.Td {...attributes} {...listeners} width={1}>
                <ActionIcon>
                    <IconGripVertical />
                </ActionIcon>
            </Table.Td>
            <Table.Td>{currency.name}</Table.Td>
            <Table.Td width={1}>{currency.prefix} {currency.suffix}</Table.Td>
            <Table.Td width={1}>
                <ActionIcon
                    variant="white"
                    color="rgba(0, 0, 0, 1)"
                    aria-label="Редактировать"
                    onClick={() => onEditCurrency(currency.id)}
                >
                    <IconPencilMinus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    );
};

export default CurrencySortableRow;