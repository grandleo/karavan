import {useEffect, useState} from "react";
import {ActionIcon, Box, Flex, Menu, rem, Text} from "@mantine/core";
import {TreeSortable} from "@/components/treeSortable";
import {IconDotsVertical, IconFileText, IconFolder, IconFolderOpen, IconPencil, IconTrash} from "@tabler/icons-react";
import classes from "@/components/externalItems/styles.module.css";

const CategoryItem = ({item, activeCategory, setActiveCategory, dragHandle = false, open, showEdit = false, setEditValues, onSetSort, handleDeleteCategory}: CategoryItemProps) => {
    const [showSubcategories, setShowSubcategories] = useState(false);
    const [subcategories, setSubcategories] = useState(item.subcategories);

    useEffect(() => {
        if(item.subcategories) {
            setSubcategories(item.subcategories)
        }
    }, [item]);

    const isActive = activeCategory?.id === item.id;

    const toggleSubcategories = () => {
        setShowSubcategories(!showSubcategories);
        setActiveCategory(item);
    }

    return (
        <>
            <Flex
                align="center"
                gap={4}
                className={`${classes.categoryItem} ${activeCategory?.id === item.id ? classes.active : ''}`}
            >
                {dragHandle && (
                    <TreeSortable.DragHandle active={isActive}/>
                )}
                {subcategories?.length > 0 ? (
                        <>
                            {showSubcategories ?
                                <Flex align="center">
                                    <IconFolderOpen
                                        size={20}
                                        stroke={1.5}
                                        color={isActive ? '#fff' : '#2997A3'}
                                        onClick={toggleSubcategories}
                                    />
                                </Flex> :
                                <Flex align="center">
                                    <IconFolder
                                        size={20}
                                        stroke={1.5}
                                        color={isActive ? '#fff' : '#2997A3'}
                                        onClick={toggleSubcategories}
                                    />
                                </Flex>
                            }
                        </>
                    ) :
                    <Flex align="center">
                        <IconFileText
                            size={20}
                            stroke={1.5}
                            color={isActive ? '#fff' : '#2997A3'}
                            onClick={toggleSubcategories}
                        />
                    </Flex>
                }
                <Text className={classes.categoryName} onClick={toggleSubcategories}>{item.name}</Text>
                {showEdit && (
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                                <IconDotsVertical/>
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    setEditValues(item)
                                    open();
                                }}
                            >
                                Редактировать
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                                color="red"
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => handleDeleteCategory(item.id)}
                            >
                                Удалить
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                )}
            </Flex>
            {showSubcategories && subcategories?.length > 0 && (
                <Box className={classes.lineLeft}>
                    <TreeSortable items={subcategories} onSortEnd={onSetSort} onChange={setSubcategories} renderItem={(subItem, index: number) => {
                        return (
                            <TreeSortable.Item id={subItem.id} className={`${classes.subCategory}`}>
                                <CategoryItem
                                    item={subItem}
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                    setEditValues={setEditValues}
                                    open={open}
                                    dragHandle={dragHandle}
                                    showEdit={showEdit}
                                    onSetSort={onSetSort}
                                    handleDeleteCategory={handleDeleteCategory}
                                />
                            </TreeSortable.Item>
                        )
                    }}/>
                </Box>
            )}
        </>
    )
}

export default CategoryItem;