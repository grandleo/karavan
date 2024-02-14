import {CloseButton, Flex, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useActions} from "@/hooks/useActions";
import {useSelector} from "react-redux";
import {getClientsState} from "@/store/slices/clientSlice";

const ClientsFilter = () => {
    const {search} = useSelector(getClientsState);
    const {clientSetSearch} = useActions();

    return (
        <Flex align="center"
              gap={15}
              mb={20}>

            <TextInput
                placeholder="Поиск"
                rightSection={
                    search ? (
                        <CloseButton aria-label="Clear input" onClick={() => clientSetSearch('')}/>
                    ) : (
                        <IconSearch size={16}/>
                    )
                }
                mb={0}
                value={search}
                onChange={(event) => clientSetSearch(event.currentTarget.value)}
            />
        </Flex>
    )
}

export default ClientsFilter;