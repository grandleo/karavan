import {Flex} from "@mantine/core";
import {IOrderCard} from "@/features/orders/types/orders.types";
import AdminOrderCard from "@/features/orders/components/OrderCard/AdminOrderCard";

interface SidebarOrdersProps {
    orders: IOrderCard[];
    activeOrderId: number | null;
    onSelectOrder: (orderId: number) => void;
}

const SidebarOrders = ({orders, activeOrderId, onSelectOrder}: SidebarOrdersProps) => {
    return (
        <Flex direction="column" gap="6px">
            {orders?.map((order) => (
                <AdminOrderCard
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