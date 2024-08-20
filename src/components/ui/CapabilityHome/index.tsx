import {Box, Flex, Image, Text} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/ui/CapabilityHome/style.module.css";

const CapabilityHome = () => {
    return (
        <Box mb={{ base: 48, sm: 72, md: 96 }}>
            <Text className={classes.capabilityHomeTitle}>Открывайте новые возможности</Text>
            <Flex direction="column" gap={{ base: 32, md: 56 }}>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}>
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>Лучшая цена</Text>
                        <Text className={classes.capabilityDescription}>Благодаря снижению цены, предложение поставщика
                            выводиться первым в списке у клиента.</Text>
                    </Box>
                    <Image
                        className={classes.capabilityImage}
                        component={NextImage}
                        src="images/homepage/best-price.svg"
                        width={400}
                        height={382}
                        fit="cover"
                        alt="Скорость"
                    />
                </Flex>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}
                >
                    <Image
                        className={classes.capabilityImage}
                        component={NextImage}
                        src="images/homepage/speed.svg"
                        width={400}
                        height={382}
                        fit="cover"
                        alt="Скорость"/>
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>Торг</Text>
                        <Text className={classes.capabilityDescription}>Дополнительная возможность купить товар, ещё
                            дешевле. Устанавливайте свои цены и торгуйтесь поставщиками, чтобы купить товары ещё
                            дешевле.</Text>
                    </Box>
                </Flex>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}
                >
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>Объем</Text>
                        <Text className={classes.capabilityDescription}>Поставщики, постоянно обновляют ассортимент.
                            Благодаря этому, клиент имеет широкий выбор и возможность купить в больших и мелких
                            объемах.</Text>
                    </Box>
                    <Image
                        className={classes.capabilityImage}
                        component={NextImage}
                        src="images/homepage/volume.svg"
                        width={400}
                        height={382}
                        fit="cover"
                        alt="Скорость"/>
                </Flex>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}>
                    <Image
                        className={classes.capabilityImage}
                        component={NextImage}
                        src="images/homepage/tender.svg"
                        width={400}
                        height={382}
                        fit="cover"
                        alt="Скорость"/>
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>Скорость</Text>
                        <Text className={classes.capabilityDescription}>Единая платформа, позволяет в два клика купить
                            товар или выставить предложение, отслеживать статус заказа или просмотреть статистику
                            продаж.</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default CapabilityHome;