import classes from "@/components/orders/orders.module.css";
import {Box, Button, Flex, NumberFormatter, Text} from "@mantine/core";
import {BidProps} from "@/components/orders/types";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useApproveBidMutation} from "@/store/api/logistic/bids.api";
import {useChangeStatusMutation} from "@/store/api/order.api";

const BidOrder = ({bid, choose_logistics} : BidProps) => {
    const [approveBid] = useApproveBidMutation();

    const approve = (id: number) => {
        approveBid({'bid_id': id}).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    }

    const ConfirmBid = () => modals.openConfirmModal({
        title: 'Выбрать этого логиста ?',
        children: (
            <>
                <Text size="sm">
                    Логист - <Text size="sm" fw="bold" component="span"> {bid.company}</Text>
                </Text>
                <Text size="sm">
                    Стоимость доставки -  <Text size="sm" fw="bold" component="span"><NumberFormatter value={bid.price} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/></Text>
                </Text>
                <Text size="sm" c="red">
                    Изменить выбор в будущем нельзя.
                </Text>
            </>
        ),
        confirmProps: { color: '#2997A3' },
        labels: { confirm: 'Всё верно', cancel: 'Передумал' },
        onConfirm: () => approve(bid.id),
    });

    return (
        <Flex className={classes.bid}>
            <Box className={classes.name}>
                <Text className={classes.nameText}>{bid.company}</Text>
            </Box>
            <Box className={classes.date}>
                <Text className={classes.dateText}>
                    <span>Дата и время доставки</span>
                    {bid.delivery_date}
                </Text>
            </Box>
            <Box className={classes.price}>
                <Text className={classes.priceText}><NumberFormatter value={bid.price} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/></Text>
            </Box>
            {choose_logistics && (
                <Box>
                    <Button variant="filled" color="#2997A3" onClick={ConfirmBid}>Выбрать</Button>
                </Box>
            )}
        </Flex>
    )
}

export default BidOrder;