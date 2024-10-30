import {createContext, type CSSProperties, useContext, useMemo} from "react";
import {ActionIcon, Box} from "@mantine/core";
import {useSortable} from "@dnd-kit/sortable";
import {type DraggableSyntheticListeners, UniqueIdentifier} from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import classes from "./SortableItem.module.css";
import {IconArrowsMove} from "@tabler/icons-react";

interface SortableItemProps {
    id: UniqueIdentifier;
    children: React.ReactNode;
}

interface Context {
    attributes: Record<string, any>;
    listeners: DraggableSyntheticListeners;
    ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
    attributes: {},
    listeners: undefined,
    ref() {}
});

const SortableItem = ({ id, children }: SortableItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const context = useMemo(() => ({
        attributes,
        listeners,
        ref: setActivatorNodeRef
    }), [attributes, listeners, setActivatorNodeRef]);

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
        transform: CSS.Translate.toString(transform),
        transition
    };

    return (
        <SortableItemContext.Provider value={context}>
            <Box ref={setNodeRef} style={style} className={classes.sortableItem}>
                {children}
            </Box>
        </SortableItemContext.Provider>
    );
};

interface DragHandleProps {
    active: boolean;
}

const DragHandle = ({ active }: DragHandleProps) => {
    // const { attributes, listeners, setActivatorNodeRef } = useSortableItemContext();
    const { attributes, listeners, ref } = useContext(SortableItemContext);

    return (
        <ActionIcon
            variant={active ? 'default' : 'light'}
            color={active ? '#000' : '#436CFB'}
            aria-label="Переместить"
            // ref={ref}
            {...attributes}
            {...listeners}
        >
            <IconArrowsMove style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
    );
};

export { SortableItem, DragHandle };