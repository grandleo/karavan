import {Button, Grid, Text, Image, Flex, Box} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/ui/BannerApp/style.module.css";
import {useTranslations} from "@/hooks/useTranslations";

const BannerApp = () => {
    const { translations, loading } = useTranslations('home');

    if (loading) {
        return <div>Loading...</div>; // Пока загружаются переводы, показываем loader
    }

    return (
        <>
            <Flex
                className={classes.bannerApp}
                direction={{base: 'column', md: 'row'}}
                align="center"
                gap={{base: 16, md: 25, lg: 72}}
            id="download">
                <Box>
                    <Text className={classes.bannerAppTitle}>
                        {translations.bannerScreen.title}
                    </Text>
                    <Text className={classes.bannerAppSubTitle}>
                        {translations.bannerScreen.subTitle}
                    </Text>
                    <Button>{translations.bannerScreen.buttonIos}</Button>
                    <Button>{translations.bannerScreen.buttonAndroid}</Button>
                </Box>
                <Image
                    component={NextImage}
                    src="images/homepage/karavap-app.svg"
                    width={435}
                    height={387}
                    fit="contain"
                    alt="Karavan App"/>
            </Flex>
            {/*direction={{ base: 'column', md: 'row' }}*/}
            {/*<Grid className={classes.bannerApp}>*/}
            {/*    <Grid.Col span={4}>*/}
            {/*        <Text className={classes.bannerAppTitle}>*/}
            {/*            Karavan App*/}
            {/*        </Text>*/}
            {/*        <Text className={classes.bannerAppSubTitle}>Все это в одном приложении, позволяющем совершать лучшие покупки на рынке. </Text>*/}
            {/*        <Button>iOS</Button>*/}
            {/*        <Button>Android</Button>*/}
            {/*    </Grid.Col>*/}
            {/*    <Grid.Col span={8}>*/}
            {/*        <Image*/}
            {/*            component={NextImage}*/}
            {/*            src="images/homepage/karavap-app.svg"*/}
            {/*            width={435}*/}
            {/*            height={387}*/}
            {/*            fit="contain"*/}
            {/*            alt="Karavan App" />*/}
            {/*    </Grid.Col>*/}
            {/*</Grid>*/}
        </>
    )
}

export default BannerApp;