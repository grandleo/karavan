import {useSortable} from "@dnd-kit/sortable";
import {Table, ColorSwatch, ActionIcon, Group, Tooltip} from "@mantine/core";
import {CSS} from '@dnd-kit/utilities';
import {IconPencilMinus, IconSwitchVertical} from "@tabler/icons-react";
import {StatusSortableRowProps} from "@/features/statuses/types/statuses.types";

const StatusSortableRow = ({id, status, onEditStatus} : StatusSortableRowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...(isDragging ? {opacity: 0.5} : {}),
    };

    return (
        <Table.Tr
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <Table.Td>
                <span {...listeners}>
                    <IconSwitchVertical stroke={1}/>
                </span>
            </Table.Td>
            <Table.Td>{status.name.ru}</Table.Td>
            <Table.Td>{status.name.en}</Table.Td>
            <Table.Td>{status.role}</Table.Td>
            <Table.Td>
                <Group gap={5}>
                    <Tooltip label="Цвет текста">
                        <ColorSwatch color={status.color}/>
                    </Tooltip>
                    <Tooltip label="Цвет фона">
                        <ColorSwatch color={status.bg_color}/>
                    </Tooltip>
                </Group>
            </Table.Td>
            <Table.Td>
                <ActionIcon variant="transparent" radius="xs" aria-label="Редактировать" onClick={() => onEditStatus(status.id)}>
                    <IconPencilMinus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    );
};

export default StatusSortableRow;