import {IconArrowsMove} from "@tabler/icons-react";
import {ActionIcon} from "@mantine/core";

interface DragHandleProps {
    active: boolean;
}

const DragHandle = ({ active }: DragHandleProps) => {

    return (
        <ActionIcon
            variant={active ? 'default' : 'light'}
            color={active ? '#000' : '#2997A3'}
            aria-label="Переместить"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
        >
            <IconArrowsMove style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
    );
};

export default DragHandle;