import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
    DraggableSyntheticListeners,
    UniqueIdentifier
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ActionIcon, Box } from "@mantine/core";
import {IconArrowsMove} from "@tabler/icons-react";
import classes from "@/components/treeSortable/styles.module.css";

interface Props {
    id: UniqueIdentifier;
    className?: string;
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

const TreeItem: React.FC<PropsWithChildren<Props>> = ({ children, id, className = "" }) => {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const context = useMemo(() => ({
        attributes,
        listeners,
        ref: setActivatorNodeRef
    }), [attributes, listeners, setActivatorNodeRef]);

    const style: CSSProperties = {
        opacity: isDragging ? 0.6 : undefined,
        transform: CSS.Translate.toString(transform),
        transition
    };

    return (
        <SortableItemContext.Provider value={context}>
            <Box className={`${classes.treeItem} ${className}`} ref={setNodeRef} style={style}>
                {children}
            </Box>
        </SortableItemContext.Provider>
    );
};

interface DragHandleProps {
    active: boolean;
}

const DragHandle: React.FC<DragHandleProps> = ({active}) => {
    const { attributes, listeners, ref } = useContext(SortableItemContext);
    return (
        <ActionIcon
            variant={active ? 'default' : 'light'}
            color={active ? '#000' : '#2997A3'}
            aria-label="HandleItem"
            {...attributes}
            {...listeners}
        >
            <IconArrowsMove style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
    );
};

export { TreeItem, DragHandle };
