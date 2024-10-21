import {Flex} from "@mantine/core";
import OrderCard from "@/features/orders/components/OrderCard/OrderCard";
import {IOrderCard} from "@/features/orders/types/orders.types";

interface SidebarOrdersProps {
    orders: IOrderCard[];
    activeOrderId: number | null;
    onSelectOrder: (orderId: number) => void;
}

const SidebarOrders = ({orders, activeOrderId, onSelectOrder}: SidebarOrdersProps) => {
    return (
        <Flex direction="column" gap="6px">
            {orders?.map((order) => (
                <OrderCard
                    key={order.id}
                    order={order}
                    isActive={order.id === activeOrderId}
                    onClick={() => onSelectOrder(order.id)}
                />
            ))}
        </Flex>
    )
}

export default SidebarOrders;