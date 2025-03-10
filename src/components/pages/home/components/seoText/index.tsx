import {Box, Grid, Text} from "@mantine/core";

import classes from "@/components/pages/home/components/seoText/seoText.module.css";

const SeoText = () => {
    return (
        <Grid pt={40}>
            <Grid.Col span={{ base: 12, sm: 10, md: 9 }}>
                <Text className={classes.title} mb={24}>
                    Торговая площадка «Караван» для оптовых закупок продуктов питания.
                </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 10, md: 6 }}>
                <Text className={classes.description}>
                    Мы подобрали поставщиков из сегмента HoReCa и объединили их продукцию в удобный сервис. Доставка заказов возможна уже на следующий день, а благодаря таргетированию цены клиенты видят самые низкие цены от поставщика.
                </Text>
            </Grid.Col>
        </Grid>
    )
}

export default SeoText;