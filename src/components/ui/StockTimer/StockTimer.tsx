import {useEffect, useState} from "react";
import {Box, Divider, Flex, Tooltip} from "@mantine/core";
import { IconClockQuestion } from '@tabler/icons-react';
import classes from "./stock-timer.module.css";

const StockTimer = () => {
    const [time, setTime] = useState('00:00');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const secondsLeft = 59 - now.getSeconds();
            const minutes = ('0' + Math.floor(secondsLeft / 60)).slice(-2);
            const seconds = ('0' + (secondsLeft % 60)).slice(-2);
            setTime(`${minutes}:${seconds}`);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Flex className={classes.timer}
              gap="8px"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap">
            <Flex className={classes.time} gap="4px" align="center">
                <Box>{time.substring(0, 2)}</Box>
                <Box className={classes.separator}>:</Box>
                <Box>{time.substring(3)}</Box>
            </Flex>
            <Divider orientation="vertical" />
            <Box>
                <Tooltip label="Время до перерасчета рейтинга цен" position="bottom" multiline w={200}>
                    <IconClockQuestion size={16} color="#4DA8B2"/>
                </Tooltip>
            </Box>
        </Flex>
    );
}

export default StockTimer;