import {Box} from "@mantine/core";
import {StatusBadgeProps} from "@/components/orders/types";
import classes from "@/components/orders/orders.module.css";

const StatusBadge = ({bg_color, color, text}: StatusBadgeProps) => {
    return (
        <Box className={classes.badge} style={{
            background: bg_color,
            color: color
        }}>
            {text}
        </Box>
    )
}

export default StatusBadge;