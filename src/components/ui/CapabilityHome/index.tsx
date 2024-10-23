import {Box, Flex, Image, Text} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/ui/CapabilityHome/style.module.css";
import {useTranslations} from "@/hooks/useTranslations";

const CapabilityHome = () => {
    const { translations, loading } = useTranslations('home');

    if (loading) {
        return <div>Loading...</div>; // Пока загружаются переводы, показываем loader
    }

    return (
        <Box mb={{ base: 48, sm: 72, md: 96 }} id="capability">
            <Text className={classes.capabilityHomeTitle}>{translations.capabilityScreen.title}</Text>
            <Flex direction="column" gap={{ base: 32, md: 56 }}>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}>
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>
                            {translations.capabilityScreen.bestPrice.title}
                        </Text>
                        <Text className={classes.capabilityDescription}>
                            {translations.capabilityScreen.bestPrice.description}
                        </Text>
                    </Box>
                    {/*<Image*/}
                    {/*    className={classes.capabilityImage}*/}
                    {/*    component={NextImage}*/}
                    {/*    src="/images/homepage/best-price.png"*/}
                    {/*    width={400}*/}
                    {/*    height={382}*/}
                    {/*    fit="cover"*/}
                    {/*    alt="Скорость"*/}
                    {/*/>*/}
                </Flex>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}
                >
                    {/*<Image*/}
                    {/*    className={classes.capabilityImage}*/}
                    {/*    component={NextImage}*/}
                    {/*    src="/images/homepage/tender.png"*/}
                    {/*    width={400}*/}
                    {/*    height={382}*/}
                    {/*    fit="cover"*/}
                    {/*    alt="Торг"/>*/}
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>
                            {translations.capabilityScreen.tender.title}
                        </Text>
                        <Text className={classes.capabilityDescription}>
                            {translations.capabilityScreen.tender.description}
                        </Text>
                    </Box>
                </Flex>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}
                >
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>
                            {translations.capabilityScreen.volume.title}
                        </Text>
                        <Text className={classes.capabilityDescription}>
                            {translations.capabilityScreen.volume.description}
                        </Text>
                    </Box>
                    {/*<Image*/}
                    {/*    className={classes.capabilityImage}*/}
                    {/*    component={NextImage}*/}
                    {/*    src="/images/homepage/volume.png"*/}
                    {/*    width={400}*/}
                    {/*    height={382}*/}
                    {/*    fit="cover"*/}
                    {/*    alt="Объем"/>*/}
                </Flex>
                <Flex
                    className={classes.capability}
                    align="center"
                    gap={{ base: 12, sm: 24, md: 32 }}
                    direction={{base: 'column', md: 'row'}}>
                    {/*<Image*/}
                    {/*    className={classes.capabilityImage}*/}
                    {/*    component={NextImage}*/}
                    {/*    src="/images/homepage/speed.png"*/}
                    {/*    width={400}*/}
                    {/*    height={382}*/}
                    {/*    fit="cover"*/}
                    {/*    alt="Скорость"/>*/}
                    <Box className={classes.capabilityInfo}>
                        <Text className={classes.capabilityTitle}>
                            {translations.capabilityScreen.speed.title}
                        </Text>
                        <Text className={classes.capabilityDescription}>
                            {translations.capabilityScreen.speed.description}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default CapabilityHome;