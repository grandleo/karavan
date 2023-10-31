import React, {createContext, CSSProperties, PropsWithChildren, useContext, useMemo} from "react";
import {DraggableSyntheticListeners, UniqueIdentifier} from "@dnd-kit/core";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import classes from "@/components/ui/sortableList/sortableList.module.css";
import {IconGripVertical} from "@tabler/icons-react";
import {ActionIcon, Box} from "@mantine/core";

interface Props {
    id: UniqueIdentifier;
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

export function TreeItem({ children, id }: PropsWithChildren<Props>) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const context = useMemo(
        () => ({
            attributes,
            listeners,
            ref: setActivatorNodeRef
        }),
        [attributes, listeners, setActivatorNodeRef]
    );

    const style: CSSProperties = {
        opacity: isDragging ? 0.6 : undefined,
        transform: CSS.Translate.toString(transform),
        transition
    };

    return (
        <SortableItemContext.Provider value={context}>
            <Box ref={setNodeRef} style={style}>
                {children}
            </Box>
        </SortableItemContext.Provider>
    );
}

export function TreeHandle() {
    const { attributes, listeners, ref } = useContext(SortableItemContext);

    return (
        <>
            <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings" {...attributes} {...listeners} ref={ref} className={classes.sortableHandle}>
                <IconGripVertical/>
            </ActionIcon>
        </>
    );
}