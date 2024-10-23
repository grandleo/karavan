'use client'

import {Box, Container} from "@mantine/core";
import BannerApp from "@/components/ui/BannerApp";
import {HomeFooter} from "@/components/ui/Footer";
import CapabilityHome from "@/components/ui/CapabilityHome";
import {HeaderHome} from "@/components/ui/header";
import HomeFirstScreen from "@/components/pages/home/components/HomeFirstScreen";
import classes from "@/components/pages/home/style.module.css";
import SalesOnHomePage from "@/components/pages/home/components/SalesOnHomePage";

const HomePage = () => {

    return (
        <>
            <Box className={classes.homeFirstScreen}>
                <HeaderHome/>
                {/*<HomeFirstScreen/>*/}
            </Box>
            {/*<SalesOnHomePage/>*/}
            <Container size="md">
                <CapabilityHome/>
                {/*<BannerApp/>*/}
            </Container>

            <HomeFooter/>

            {/*<Header />*/}
            {/*<Container>*/}
            {/*    <Grid>*/}
            {/*        <Grid.Col span={3}>*/}
            {/*            <Image component={NextImage} src="./images/homepage/home_section_1_1.svg" w="auto" fit="cover" width={197} height={225} alt="" m="50 auto 50" className={classes.imagesShadow}/>*/}
            {/*            <Image component={NextImage} src="./images/homepage/home_section_1_2.svg" w="auto" fit="cover" width={228} height={118} alt="" m="0 auto" className={classes.imagesShadow}/>*/}
            {/*        </Grid.Col>*/}
            {/*        <Grid.Col span={6}>*/}
            {/*            <Image component={NextImage} src="./images/homepage/home_section_1.svg" w="auto" fit="contain" width={599} height={444} alt="" m="0 auto"/>*/}
            {/*        </Grid.Col>*/}
            {/*        <Grid.Col span={3}>*/}
            {/*            <Image component={NextImage} src="./images/homepage/home_section_1_3.svg" w="auto" fit="cover" width={265} height={138} alt="" m="50 auto 50" className={classes.imagesShadow}/>*/}
            {/*            <Image component={NextImage} src="./images/homepage/home_section_1_4.svg" w="auto" fit="cover" width={240} height={149} alt="" m="0 auto" className={classes.imagesShadow}/>*/}
            {/*        </Grid.Col>*/}
            {/*        <Grid.Col span={8} offset={2} mt={-50}>*/}
            {/*            <Text className={classes.title} mb={20}>*/}
            {/*                Karavan делает оптовую торговлю простой и быстрой.*/}
            {/*            </Text>*/}
            {/*            <Text className={classes.subTitle} id="text">*/}
            {/*                Программное обеспечение и сервисы Karavan работают сообща, чтобы предоставить поставщикам, клиентам и логистам наилучший опыт взаимодействия друг с другом.*/}
            {/*            </Text>*/}
            {/*        </Grid.Col>*/}
            {/*    </Grid>*/}
            {/*</Container>*/}
            {/*<Advantages/>*/}
        </>
    )
}

export default HomePage;