import {Avatar, Box, Card, Flex, Text} from "@mantine/core";

import classes from "@/components/pages/home/components/userReviews/userReviews.module.css";
import {Mousewheel} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

const reviewsData = [
    {
        name: "Арташес Симонян",
        position: "Управляющий директор сети шаурмы",
        review:
            "Работаю в гостиничном бизнесе уже много лет, и проблема с поставками всегда была головной болью. Но с появлением этого сервиса все изменилось. Удобный интерфейс, огромный ассортимент, честные цены и самое главное — никаких задержек с доставкой. Поддержка всегда на связи и готова прийти на помощь. Отличный инструмент для бизнеса!",
    },
    {
        name: "Екатерина Иванова",
        position: "Руководитель ресторана",
        review:
            "Сервис помог оптимизировать закупки для нашего ресторана. Очень удобно, что можно сравнивать предложения от разных поставщиков в одном месте. Всегда быстрые поставки и отличное обслуживание. Рекомендую всем коллегам по цеху!",
    },
    {
        name: "Игорь Петров",
        position: "Менеджер отеля",
        review:
            "У нас большой поток гостей, и всегда важно, чтобы поставки продуктов и расходников были вовремя. Этот сервис стал для нас настоящим спасением. Всё чётко, без заминок. Огромное спасибо за такой инструмент!",
    },
];

const UserReviews = () => {
    return (
        <Box pt={80} pb={90}>
            <Text className={classes.blockTitle} mb={40}>Благодарности наших потребителей</Text>
            <Swiper
                modules={[Mousewheel]}
                mousewheel={{forceToAxis: true}}
                spaceBetween={20}
                className="swiper-container"
                breakpoints={{
                    320: { slidesPerView: 1.2 }, // Мобильные устройства (от 320px)
                    768: { slidesPerView: 1.5 }, // Планшеты (от 768px)
                    1024: { slidesPerView: 3 }, // Десктоп (от 1024px)
                    1440: { slidesPerView: 3 }  // Широкие экраны (от 1440px)
                }}
            >
                {reviewsData.map((review, index) => (
                    <SwiperSlide
                        key={index}
                    >
                        <Card padding={24} radius={16} className={classes.card} key={index}>
                            <Flex mb={16} align="center" justify="space-between">
                                <Box>
                                    <Text className={classes.name}>{review.name}</Text>
                                    <Text className={classes.company}>{review.position}</Text>
                                </Box>
                                <Avatar
                                    name={review.name}
                                    color="initials"
                                    className={classes.avatar}
                                />
                            </Flex>
                            <Text
                                className={classes.review}
                                lineClamp={5}
                            >
                                {review.review}
                            </Text>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export default UserReviews;