import {CloseButton, Flex, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useSelector} from "react-redux";
import {getLogisticsState} from "@/store/slices/logisticSlice";
import {useActions} from "@/hooks/useActions";

const LogisticsFilter = () => {
    const {search} = useSelector(getLogisticsState);
    const {logisticSetSearch} = useActions();

    return (
        <Flex align="center"
              gap={15}
              mb={20}>

            <TextInput
                placeholder="Поиск"
                rightSection={
                    search ? (
                        <CloseButton aria-label="Clear input" onClick={() => logisticSetSearch('')}/>
                    ) : (
                        <IconSearch size={16}/>
                    )
                }
                mb={0}
                value={search}
                onChange={(event) => logisticSetSearch(event.currentTarget.value)}
            />
        </Flex>
    )
}

export default LogisticsFilter;