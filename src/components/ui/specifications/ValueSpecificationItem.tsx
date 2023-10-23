import {ActionIcon, Box, TextInput} from "@mantine/core";
import {DragHandle} from "@/components/ui/sortableList/SortableItem";
import {IconTrash} from "@tabler/icons-react";
import {ChangeEvent} from "react";
import classes from "./specifications.module.css";

interface Props{
    item: any;
    removeItem?: (index: number, id: number) => void;
    handleInputChange?: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
    handleRemoveValue: (id: number) => void;
}

const ValueSpecificationItem = ({item, handleInputChange, handleRemoveValue}: Props) => {
    const {id, value} = item

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (handleInputChange) {
            handleInputChange(event, item.id);
        }
    };

    return (
        <>
            <Box>
                <DragHandle/>
            </Box>
            <Box className={classes.valueItem}>
                <TextInput
                    name="value"
                    value={value}
                    placeholder="Значение"
                    onChange={handleChange}
                    type="text"
                    mb={{ base: 0 }}
                />
            </Box>
            <Box>
                <ActionIcon variant="subtle" color="rgba(255, 0, 0, 1)" aria-label="Удалить" onClick={() => handleRemoveValue(id)}>
                    <IconTrash size={19}/>
                </ActionIcon>
            </Box>
        </>
    )
}

export default ValueSpecificationItem;