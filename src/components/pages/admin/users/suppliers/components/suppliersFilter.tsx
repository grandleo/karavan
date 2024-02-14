import {CloseButton, Flex, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useSelector} from "react-redux";
import {useActions} from "@/hooks/useActions";
import {getSuppliersState} from "@/store/slices/supplierSlice";

const SuppliersFilter = () => {
    const {search} = useSelector(getSuppliersState);
    const {supplierSetSearch} = useActions();

    return (
        <Flex align="center"
              gap={15}
              mb={20}>

            <TextInput
                placeholder="Поиск"
                rightSection={
                    search ? (
                        <CloseButton aria-label="Clear input" onClick={() => supplierSetSearch('')}/>
                    ) : (
                        <IconSearch size={16}/>
                    )
                }
                mb={0}
                value={search}
                onChange={(event) => supplierSetSearch(event.currentTarget.value)}
            />
        </Flex>
    )
}

export default SuppliersFilter;