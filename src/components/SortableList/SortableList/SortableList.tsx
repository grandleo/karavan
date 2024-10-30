import {useCallback, useState} from "react";
import {Box} from "@mantine/core";
import {
    Active, defaultDropAnimationSideEffects,
    DndContext,
    DragOverlay,
    DropAnimation,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {restrictToVerticalAxis, restrictToWindowEdges} from "@dnd-kit/modifiers";
import {BaseItem, SortableListProps} from "@/components/SortableList/types";
import {SortableItem} from "@/components/SortableList";
import classes from "./SortableList.module.css";

const SortableList = <T extends BaseItem>({
                                              items,
                                              onChange,
                                              onSortEnd,
                                              renderItem,
                                          }: SortableListProps<T>) => {
    const [active, setActive] = useState<Active | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragStart = useCallback(({ active }: { active: Active }) => {
        setActive(active);
    }, []);

    const handleDragEnd = useCallback(
        ({ active, over }: { active: Active; over: any }) => {
            if (over && active.id !== over.id) {
                const activeIndex = items.findIndex(({ id }) => id === active.id);
                const overIndex = items.findIndex(({ id }) => id === over.id);

                const newOrder = arrayMove(items, activeIndex, overIndex);
                onChange(newOrder);

                if (onSortEnd) onSortEnd(newOrder.map((item) => item.id));
            }
            setActive(null);
        },
        [items, onChange, onSortEnd]
    );

    const handleDragCancel = useCallback(() => {
        setActive(null);
    }, []);

    const activeItem = active ? items.find((item) => item.id === active.id) : null;

    const dropAnimationConfig: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.4',
                },
            },
        }),
    };

    console.log(items)

    return (
        <Box className={classes.sortableList}>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
                <SortableContext items={items}>
                    {items.map((item, index) => (
                        <SortableItem key={item.id} id={item.id}>
                            {renderItem(item, index)}
                        </SortableItem>
                    ))}
                </SortableContext>
                <DragOverlay dropAnimation={dropAnimationConfig}>
                    {activeItem && renderItem(activeItem, items.indexOf(activeItem))}
                </DragOverlay>
            </DndContext>
        </Box>
    );
};

export default SortableList;