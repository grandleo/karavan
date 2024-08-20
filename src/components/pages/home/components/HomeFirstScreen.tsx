import {Box, Container, Text} from "@mantine/core";
import classes from "@/components/pages/home/style.module.css";
import {HeaderHome} from "@/components/ui/header";

const HomeFirstScreen = () => {
    return (
        <>
            <Container size="md" pt={{base: 180, md: 300, lg: 480}}>
                <Text className={classes.title}>
                    Делаем оптовую торговлю простой и быстрой
                </Text>
                <Text className={classes.subTitle} visibleFrom="xs">
                    Программное обеспечение и сервисы функционируют вместе, чтобы обеспечить поставщикам и клиентам
                    оптимальные условия для сотрудничества.
                </Text>
            </Container>
        </>
    )
}

export default HomeFirstScreen;