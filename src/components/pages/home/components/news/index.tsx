import {Box, Card, Image, NavLink, Text} from "@mantine/core";
import Link from "next/link";
import {IconChevronRight} from "@tabler/icons-react";
import {Mousewheel} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

const newsData = [
    {
        title: "Новая версия платформы Karavan",
        description:
            "Мы перебрали массу вариантов и остановились на рынке HoReCa, уже получили отличную обратную связь и за это время реализовали множество нового функционала, включая мобильное приложение для удобства клиентов. Наша платформа помогает быстро решать каждую задачу — от поиска лучших цен до отслеживания доставки.",
        link: "/",
        image: "/images/placeholder.svg"
    },
    {
        title: "Новые функции для рестораторов",
        description:
            "Теперь в платформе Karavan доступны инструменты для более удобного управления закупками в сфере HoReCa. Мы продолжаем улучшать наш продукт на основе отзывов пользователей.",
        link: "/",
        image: "/images/placeholder.svg"
    },
    {
        title: "Оптимизация закупок с Karavan",
        description:
            "Karavan помогает бизнесу экономить время и деньги на закупках. Сравнивайте предложения поставщиков, получайте выгодные условия и автоматизируйте процессы.",
        link: "/",
        image: "/images/placeholder.svg"
    }
];

const News = () => {
    return (
        <Box pt={80}>
            <Text mb={40} style={{ fontSize: '32px', fontWeight: 'bold' }}>
                Новости
            </Text>
            <Swiper
                modules={[Mousewheel]}
                mousewheel={{ forceToAxis: true }}
                spaceBetween={20}
                className="swiper-container"
                breakpoints={{
                    320: { slidesPerView: 1.2 }, // Мобильные устройства
                    768: { slidesPerView: 1.5 }, // Планшеты
                    1024: { slidesPerView: 2.3 }, // Небольшие десктопы
                    1440: { slidesPerView: 3 }    // Широкие экраны
                }}
            >
                {newsData.map((news, index) => (
                    <SwiperSlide key={index}>
                        <Card shadow="sm" padding={20} radius={16} withBorder>
                            <Image
                                src={news.image}
                                height={280}
                                radius={12}
                                alt={news.title}
                            />

                            <Text
                                style={{
                                    fontWeight: 400,
                                    fontSize: '24px',
                                    lineHeight: '100%',
                                    letterSpacing: '0',
                                    color: '#1B1F3BE5',
                                    height: '48px',
                                    margin: '16px 0'
                                }}
                                lineClamp={2}
                            >
                                {news.title}
                            </Text>

                            <Text
                                style={{
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    letterSpacing: 0,
                                    color: '#30344E',
                                    marginBottom: '16px'
                                }}
                                lineClamp={2}
                            >
                                {news.description}
                            </Text>

                            <NavLink
                                label="Читать статью"
                                component={Link}
                                href={news.link}
                                rightSection={<IconChevronRight size={16} stroke={1.5} />}
                            />
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default News;