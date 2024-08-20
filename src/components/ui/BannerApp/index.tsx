import {Button, Grid, Text, Image, Flex, Box} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/ui/BannerApp/style.module.css";

const BannerApp = () => {
    return (
        <>
            <Flex
                className={classes.bannerApp}
                direction={{base: 'column', md: 'row'}}
                align="center"
                gap={{base: 16, md: 25, lg: 72}}>
                <Box>
                    <Text className={classes.bannerAppTitle}>
                        Karavan App
                    </Text>
                    <Text className={classes.bannerAppSubTitle}>Все это в одном приложении, позволяющем совершать лучшие
                        покупки на рынке. </Text>
                    <Button>iOS</Button>
                    <Button>Android</Button>
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