import {Flex, Select, Text} from "@mantine/core";
import {SelectWarehouseProps} from "@/components/client-stock/types";
import {IconArrowNarrowRight, IconMapPinFilled} from "@tabler/icons-react";
import _ from "lodash";
import {useSelector} from "react-redux";
import {getStock} from "@/store/slices/stockSlice";
import {useActions} from "@/hooks/useActions";
import {useEffect} from "react";
import classes from "../client-stock.module.css";

const SelectWarehouse = ({warehouses} : SelectWarehouseProps) => {
    const count = _.size(warehouses)

    const {choseWarehouseClient} = useSelector(getStock);
    const {chooseWarehouseClient} = useActions();

    const data = _.map(warehouses, item => ({
        label: item.address,
        value: String(item.id),
    }));

    const selectWarehouse = (data : string | null) => {
        if(data === null) {
            chooseWarehouseClient(0)
        } else {
            chooseWarehouseClient(Number(data))
        }
    }

    useEffect(() => {
        if(count === 1) chooseWarehouseClient(warehouses[0]?.id)
    }, [warehouses]);

    return (
        <>
            <IconArrowNarrowRight/>

            <Flex align="center" gap={12} className={classes.warehouses}>
                <IconMapPinFilled className={classes.warehousesMap}/>

                {count === 1 ? (
                    <Text>{warehouses[0]?.address}</Text>
                ) : (
                    <Select
                        size="xs"
                        // value={[String(chooseWarehouseClient)]}
                        data={data}
                        onChange={selectWarehouse}
                    />
                )}
            </Flex>
        </>
    )
}

export default SelectWarehouse;