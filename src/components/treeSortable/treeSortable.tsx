import React, {useCallback, useState} from "react";
import {BaseItem, TreeSortableProps} from "@/components/treeSortable/types";
import {
    Active, defaultDropAnimationSideEffects,
    DndContext,
    DragOverlay,
    type DropAnimation,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {TreeItem, DragHandle} from "@/components/treeSortable/treeItem";


const TreeSortable = <T extends BaseItem>({items, onChange, onSortEnd, renderItem}: TreeSortableProps<T>) => {
    const [active, setActive] = useState<Active | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragStart = useCallback(({ active }: { active: Active }) => {
        setActive(active);
    }, []);

    const handleDragEnd = useCallback(({ active, over }: { active: Active, over: any }) => {
        if (over && active.id !== over.id) {
            const activeIndex = items.findIndex(({ id }) => id === active.id);
            const overIndex = items.findIndex(({ id }) => id === over.id);

            const newSort = arrayMove(items, activeIndex, overIndex);
            onChange(newSort);

            if(onSortEnd) onSortEnd(newSort.map(item => item.id));
        }
        setActive(null);
    }, [items, onChange, onSortEnd]);

    const handleDragCancel = useCallback(() => {
        setActive(null);
    }, []);

    const activeItem = active ? items.find(item => item.id === active.id) : null;

    const dropAnimationConfig: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.4"
                }
            }
        })
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            modifiers={[restrictToVerticalAxis]}
        >
            <SortableContext items={items}>
                {items.map((item, index) => (
                    <React.Fragment key={item.id}>{renderItem(item, index)}</React.Fragment>
                ))}
            </SortableContext>
            <DragOverlay dropAnimation={dropAnimationConfig}>
                {activeItem && renderItem(activeItem)}
            </DragOverlay>
        </DndContext>
    );
}

TreeSortable.Item = TreeItem;
TreeSortable.DragHandle = DragHandle;

export default TreeSortable;