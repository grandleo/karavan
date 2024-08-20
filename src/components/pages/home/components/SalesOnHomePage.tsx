import {Carousel} from "@mantine/carousel";
import {Box, Container, Flex, Text} from "@mantine/core";
import classes from "@/components/pages/home/style.module.css";
import {IconStopwatch} from "@tabler/icons-react";

const salesData = [
    {
        title: "iPhone 14 ProMax 128GB Black LL/A",
        price: "52 600 ₽",
        quantity: "400 шт.",
        time: "2 мин. назад",
    },
    {
        title: "Samsung Galaxy S23 Ultra 512GB",
        price: "96 800 ₽",
        quantity: "150 шт.",
        time: "5 мин. назад",
    },
    // Добавьте остальные элементы сюда
];

// Количество повторений
const repeatCount = 10;

const repeatedSalesData = Array(repeatCount).fill(salesData).flat();

const SalesOnHomePage = () => {
    return (
        <Container fluid className={classes.salesOnHomePage}>
            <Text className={classes.salesTitle}>
                <IconStopwatch stroke={1}/> Сделки в реальном времени
            </Text>


            <Carousel
                withControls={false}
                loop
                dragFree
                align="start"
                slideSize="316px"
                slideGap={16}
                height={96}>
                {repeatedSalesData.map((item, index) => (
                    <Carousel.Slide key={index}>
                        <Box
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                padding: "12px 24px",
                            }}
                        >
                            <Text className={classes.productName}>{item.title}</Text>
                            <Box className={classes.productPrice}>{item.price}</Box>
                            <Flex align="center" gap={16} justify="space-between">
                                <Text className={classes.productQty}>{item.quantity}</Text>
                                <Text className={classes.productDate}>{item.time}</Text>
                            </Flex>
                        </Box>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Container>
    )
}

export default SalesOnHomePage;