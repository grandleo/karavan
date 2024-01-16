import {TreeHandle} from "@/components/ui/sortableList/TreeItem";
import {ActionIcon, Flex, TextInput} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {ChangeEvent} from "react";
import classes from "../specifications.module.css";
import {ValueItemProps} from "@/types/specification";

const ValueItem = ({item, removeItem, inputChange}: ValueItemProps) => {

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        if(inputChange) {
            inputChange(event, item.id)
        }
    }

    return (
        <>
            <Flex align="center" gap={5} className={classes.valueItem}>
                <TreeHandle/>
                <TextInput
                    name="value"
                    value={item.value}
                    placeholder="Значение"
                    onChange={changeValue}
                    type="text"
                    mb={{ base: 0 }}
                    style={{flexGrow: 1}}
                />
                <ActionIcon variant="subtle" color="rgba(255, 0, 0, 1)" aria-label="Удалить"
                            onClick={() => removeItem(item.id)}
                >
                    <IconTrash size={19}/>
                </ActionIcon>
            </Flex>
        </>
    )
}

export default ValueItem;