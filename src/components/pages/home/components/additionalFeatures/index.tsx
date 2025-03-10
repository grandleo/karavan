import {Swiper, SwiperSlide} from "swiper/react";
import {Mousewheel} from 'swiper/modules';

import {Box, Image, Text} from "@mantine/core";

import classes from "@/components/pages/home/components/additionalFeatures/additionalFeatures.module.css";
import 'swiper/css';
import 'swiper/css/mousewheel';

const slidesData = [
    {
        imageName: "purchased_goods",
        title: "Купить товар",
        description: "Предложения поставщиков в одном месте — закупайтесь по лучшей цене!",
    },
    {
        imageName: "order_management",
        title: "Управление заказами",
        description: "Заказы, сформированные до 23:00, доставляются уже на следующий день",
    },
    {
        imageName: "choose_goods",
        title: "Выбрать товар",
        description: "Простой поиск и большой ассортимент благодаря объединению поставщиков в одном месте.",
    },
    {
        imageName: "volume",
        title: "Объем",
        description: "Покупайте любое количество",
    },
    {
        imageName: "trade",
        title: "Трейд",
        description: "Возможность покупать дешевле, если берешь больше",
    },
    {
        imageName: "sales_statistics",
        title: "Статистика продаж",
        description: "Видите статистику популярности товара",
    },
    {
        imageName: "corporate_access",
        title: "Корпоративный доступ",
        description: "Вся команда в одном месте",
    },
];

const AdditionalFeatures = () => {
    return (
        <Box pt={95}>
            <Text className={classes.blockTitle} mb={35}>Дополнительные возможности</Text>
            <Swiper
                modules={[Mousewheel]}
                mousewheel={{forceToAxis: true}}
                spaceBetween={20}
                className="swiper-container"
                // slidesPerView="auto"
                // style={{height: 650, maxWidth: "100%"}}
                breakpoints={{
                    320: { slidesPerView: 1.5 }, // Мобильные устройства
                    768: { slidesPerView: 1.5 }, // Планшеты
                    1024: { slidesPerView: 1.9 }, // Небольшие десктопы
                    1440: { slidesPerView: 2.4 }    // Широкие экраны
                }}
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        // style={{width: 550, height: 650, maxWidth: 550}}
                    >
                        <Box>
                            <Image
                                src={`/images/home/features/${slide.imageName}.webp`}
                                mb={20}
                                fit="cover"
                            />
                            <Text className={classes.title} mb={8}>
                                {slide.title}
                            </Text>
                            <Text className={classes.description}>{slide.description}</Text>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export default AdditionalFeatures;