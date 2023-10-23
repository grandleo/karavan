import {Box, TextInput} from "@mantine/core";
import {DragHandle} from "@/components/ui/sortableList/SortableItem";
import {IconTrash} from "@tabler/icons-react";

interface Props{
    removeItem: (index: number, id: number) => void;
}

const ValueSpecificationItem = ({removeItem}: Props) => {
    return (
        <>
            <Box>
                <DragHandle/>
            </Box>
            <Box>
                <TextInput
                    name="value"
                    placeholder="Значение"
                    type="text"
                    mb={{ base: 0 }}
                />
            </Box>
            <Box onClick={() => removeItem}>
                <IconTrash/>
            </Box>
        </>
    )
}

export default ValueSpecificationItem;