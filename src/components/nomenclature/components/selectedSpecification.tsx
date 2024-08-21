import {ActionIcon, Box, Flex, Switch, Text, Tooltip} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {TreeSortable} from "@/components/treeSortable";
import classes from "@/components/nomenclature/styles.module.css";

const SelectedSpecification = ({item, onRemove, onToggleTradingFeature}) => {
    const handleToggle = () => {
        onToggleTradingFeature(item.id);
    };

    return (
        <Flex className={classes.categorySelectedSpecification}>
            <TreeSortable.DragHandle active={true}/>
            <Tooltip label="Выводить в торг. особенность" refProp="rootRef">
                <Switch
                    checked={item.trading_feature}
                    onChange={handleToggle}
                />
            </Tooltip>
            <Text className={classes.name}>{item.name}</Text>
            <ActionIcon variant="subtle" color="rgba(255, 0, 0, 1)" aria-label="Удалить" onClick={() => onRemove(item)}>
                <IconTrash size={19}/>
            </ActionIcon>
        </Flex>
    )
}

export default SelectedSpecification;