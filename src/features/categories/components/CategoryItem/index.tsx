import CategoryTree, {Category} from "@/features/categories/components/CategoryTree";
import {useState} from "react";
import {Box, Menu, UnstyledButton, Text, Flex} from "@mantine/core";
import {
    IconDotsVertical,
    IconEdit,
    IconFolder, IconFolderFilled,
    IconFolderMinus, IconFolderOpen,
    IconGripVertical,
    IconTrash
} from "@tabler/icons-react";
import { CSS } from '@dnd-kit/utilities';
import {useSortable} from "@dnd-kit/sortable";
import classes from "./CategoryItem.module.css";

interface CategoryItemProps {
    category: Category;
    expandedIds: Set<string>;
    toggleExpand: (id: string) => void;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    isSelected: boolean;
    onSelect: (categoryId: string) => void;
}

const CategoryItem = ({
                          category,
                          expandedIds,
                          toggleExpand,
                          onEdit,
                          onDelete,
                          isSelected,
                          onSelect
                      }: CategoryItemProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isSelected ? '#e0e0e0' : undefined, // Выделение выбранной категории
    };

    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedIds.has(category.id);

    const renderIcon = () => {
        if (isHovered) {
            return <IconGripVertical size={16} />;
        } else {
            if (hasChildren) {
                return isExpanded ? <IconFolderOpen size={16} /> : <IconFolderFilled size={16} />;
            } else {
                return <IconFolder size={16} />;
            }
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(category.id);
    };

    const handleTextClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(category.id); // Вызываем onSelect
        if (hasChildren) {
            toggleExpand(category.id); // Вызываем toggleExpand, если есть дочерние категории
        }
    };

    return (
        <Flex
            align="center"
            wrap="nowrap"
            ref={setNodeRef}
            style={style}
            className={`${classes.categoryItem} ${isSelected ? classes.selected : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <Box className={classes.dragHandle} {...attributes} {...listeners}>
                {renderIcon()}
            </Box>
            <Text
                className={classes.categoryName}
                onClick={handleTextClick}
            >
                {category.name}
            </Text>
            <Menu shadow="md" width={150}>
                <Menu.Target>
                    <IconDotsVertical size={16} onClick={(e) => e.stopPropagation()}/>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item icon={<IconEdit size={14}/>} onClick={() => onEdit(category)}>
                        Редактировать
                    </Menu.Item>
                    <Menu.Item icon={<IconTrash size={14}/>} color="red" onClick={() => onDelete(category)}>
                        Удалить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Flex>
    );
}

export default CategoryItem;