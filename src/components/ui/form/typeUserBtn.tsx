import {Box, Text} from "@mantine/core";
import classes from "./form.module.css";
import {useState} from "react";
import { IconCircleFilled, IconCircleCheck } from '@tabler/icons-react';

const TypeUserBtn = ({setField}: any) => {
    const [active, setActive] = useState('supplier');

    const handleClick = (value: any) => {
        setActive(value)
        setField('role', value)
    }

    return (
        <>
            <Box className={`${classes.checkboxCustom} ${active === 'supplier' ? classes.checkboxCustomActive : null}`} onClick={(e) => handleClick('supplier')}>
                <Text className={classes.checkboxLabel}>Поставщик</Text>
                <Text className={classes.checkboxDescription}>Оптовые поставки медикаментов</Text>
                <Box className={classes.checkboxIcon}>
                    {active === 'supplier' ? <IconCircleCheck/> : <IconCircleFilled/>}
                </Box>
            </Box>
            <Box className={`${classes.checkboxCustom} ${active === 'client' ? classes.checkboxCustomActive : null}`} onClick={(e) => handleClick('client')}>
                <Text className={classes.checkboxLabel}>Клиент</Text>
                <Text className={classes.checkboxDescription}>Оптовые закупки медикаментов</Text>
                <Box className={classes.checkboxIcon}>
                    {active === 'client' ? <IconCircleCheck/> : <IconCircleFilled/>}
                </Box>
            </Box>
            <Box className={`${classes.checkboxCustom} ${active === 'logistic' ? classes.checkboxCustomActive : null}`} onClick={(e) => handleClick('logistic')}>
                <Text className={classes.checkboxLabel}>Логистическая компания</Text>
                <Text className={classes.checkboxDescription}>Перевозка и доставка медикаментов</Text>
                <Box className={classes.checkboxIcon}>
                    {active === 'logistic' ? <IconCircleCheck/> : <IconCircleFilled/>}
                </Box>
            </Box>

        </>
    )
}

export default TypeUserBtn;