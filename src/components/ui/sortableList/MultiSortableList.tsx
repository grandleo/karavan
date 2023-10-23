import React, {useMemo, useState} from "react";
import type { ReactNode } from "react";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import {SortableOverlay} from "@/components/ui/sortableList/SortableOverlay";
import {DragHandle, SortableItem} from "@/components/ui/sortableList/SortableItem";
import {Box} from "@mantine/core";
import classes from "./sortableList.module.css";

interface BaseItem {
    id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
    items: T[];
    onChange(items: T[]): void;
    onSortEnd?: (ids: {}) => void;
    renderItem(item: T, index?: number): ReactNode;
}

export function SortableList<T extends BaseItem>({items, onChange, onSortEnd, renderItem}: Props<T>) {
    const [active, setActive] = useState<Active | null>(null);
    const activeItem = useMemo(
        () => items?.find((item) => item.id === active?.id),
        [active, items]
    );
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    if(items?.length === 0) return null

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({ active }) => {
                setActive(active);
            }}
            onDragEnd={({ active, over }) => {
                if (over && active.id !== over?.id) {
                    const activeIndex = items?.findIndex(({ id }) => id === active.id);
                    const overIndex = items?.findIndex(({ id }) => id === over.id);

                    const newSort = arrayMove(items, activeIndex, overIndex);
                    onChange(newSort);

                    if(onSortEnd) onSortEnd(newSort.map(item => item.id))
                }
                setActive(null);
            }}
            onDragCancel={() => {
                setActive(null);
            }}
        >
            <SortableContext items={items}>
                <Box className={classes.sortableList}>
                    {items?.map((item, index) => (
                        <React.Fragment key={item.id}>{renderItem(item, index)}</React.Fragment>
                    ))}
                </Box>
            </SortableContext>
            <SortableOverlay>
                {activeItem ? renderItem(activeItem) : null}
            </SortableOverlay>
        </DndContext>
    );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;