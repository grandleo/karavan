import {
    closestCenter,
    DndContext,
    DragEndEvent, DragOverlay, DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import CategoryItem from "@/features/categories/components/CategoryItem";
import {useState} from "react";
import {Text} from "@mantine/core";
import classes from "./CategoryTree.module.css";

export interface Category {
    id: string;
    name: string;
    children?: Category[];
}

interface CategoryTreeProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    onDragEnd: (categories: Category[]) => void;
    selectedCategoryId: string | null;
    onSelectCategory: (categoryId: string) => void;
}

const CategoryTree = ({
                          categories,
                          onEdit,
                          onDelete,
                          onDragEnd,
                          selectedCategoryId,
                          onSelectCategory
                      }: CategoryTreeProps) => {

    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [activeDragCategory, setActiveDragCategory] = useState<Category | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const findCategoryById = (cats: Category[]): Category | null => {
            for (const cat of cats) {
                if (cat.id === active.id) return cat;
                if (cat.children) {
                    const found = findCategoryById(cat.children);
                    if (found) return found;
                }
            }
            return null;
        };
        const activeCategory = findCategoryById(categories);
        setActiveDragCategory(activeCategory);
    };

    const handleDragEndInternal = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveDragCategory(null);
            return;
        }

        if (active.id === over.id) {
            setActiveDragCategory(null);
            return;
        }

        // Для простоты перетаскиваем внутри одного уровня
        const oldIndex = categories.findIndex(cat => cat.id === active.id);
        const newIndex = categories.findIndex(cat => cat.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const newCategories = arrayMove(categories, oldIndex, newIndex);
            onDragEnd(newCategories);
        }

        setActiveDragCategory(null);
    };

    const handleDragCancel = () => {
        setActiveDragCategory(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEndInternal}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={categories?.map(cat => cat.id)} strategy={verticalListSortingStrategy}>
                <ul className={classes.categoryTree}>
                    {categories?.map(category => (
                        <li key={category.id}>
                            <CategoryItem
                                category={category}
                                expandedIds={expandedIds}
                                toggleExpand={toggleExpand}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isSelected={selectedCategoryId === category.id}
                                onSelect={onSelectCategory}
                            />
                            {category?.children && expandedIds.has(category.id) && (
                                <div className={classes.children}>
                                    <CategoryTree
                                        categories={category.children}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onDragEnd={(updatedChildren) => {
                                            const updatedCategory = { ...category, children: updatedChildren };
                                            const updatedCategories = categories.map(cat =>
                                                cat.id === category.id ? updatedCategory : cat
                                            );
                                            onDragEnd(updatedCategories);
                                        }}
                                        selectedCategoryId={selectedCategoryId}
                                        onSelectCategory={onSelectCategory}
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </SortableContext>
            <DragOverlay>
                {activeDragCategory ? (
                    <div className={classes.dragOverlay}>
                        <Text>{activeDragCategory.name}</Text>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default CategoryTree;