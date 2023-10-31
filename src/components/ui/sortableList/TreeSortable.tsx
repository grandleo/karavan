import {
    Active,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import React, {ReactNode, useMemo, useState} from "react";
import {arrayMove, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {restrictToVerticalAxis, restrictToWindowEdges} from "@dnd-kit/modifiers";
import {SortableOverlay} from "@/components/ui/sortableList/SortableOverlay";
import {DragHandle, SortableItem} from "@/components/ui/sortableList/SortableItem";
import {SortableList} from "@/components/ui/sortableList/SortableList";

interface BaseItem {
    id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
    items: T[];
    onChange(items: T[]): void;
    onSortEnd?: (ids: {}) => void;
    renderItem(item: T, index?: number): ReactNode;
}

export function TreeSortable<T extends BaseItem>({items, onChange, onSortEnd, renderItem}: Props<T>) {
    const [active, setActive] = useState<Active | null>(null);

    const activeItem = useMemo(
        () => items?.find((item, index) => item.id === active?.id),
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
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext items={items}>
                {items?.map((item, index) => (
                    <React.Fragment key={item.id}>{renderItem(item, index)}</React.Fragment>
                ))}
            </SortableContext>
            <SortableOverlay>
                {activeItem ? renderItem(activeItem) : null}
            </SortableOverlay>
        </DndContext>
    )
}

TreeSortable.Item = SortableItem;
TreeSortable.DragHandle = DragHandle;