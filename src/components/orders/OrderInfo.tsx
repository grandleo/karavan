import {NumberFormatter, Text} from "@mantine/core";
import classes from "@/components/orders/orders.module.css";

interface Props {
    text: string,
    value: string | number,
    numberFormat?: boolean
}

const OrderInfo = ({text, value, numberFormat} : Props) => {
    return (
        <Text className={classes.orderInfo}>
            <span>{text}</span>

            {value && typeof value === 'number' && numberFormat ? (
                <>
                    <NumberFormatter className={classes.orderInfoSpan} value={value} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/>
                </>
            ) : (
                value ? value : '-'
            )}
        </Text>
    )
}

export default OrderInfo;