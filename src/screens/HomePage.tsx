'use client'

import {
    Box,
    Container, Flex, Image,
} from "@mantine/core";
import {HeaderHome} from "@/components/ui/header";
import {HomeFooter} from "@/components/ui/Footer";
import {useMediaQuery} from "@mantine/hooks";
import {useTranslation} from "@/hooks/useTranslation";

import AdditionalFeatures from "@/components/pages/home/components/additionalFeatures";
import UserReviews from "@/components/pages/home/components/userReviews";
import News from "@/components/pages/home/components/news";
import SeoText from "@/components/pages/home/components/seoText";
import Slide from "@/components/pages/home/components/slide";
import ModalAuth from "@/features/auth/components/ModalAuth/ModalAuth";
import NextImage from "next/image";
import Link from "next/link";

const HomePage = () => {
    // const {trans} = useTranslation();
    // const isSmallScreen = useMediaQuery('(max-width: 768px)');

    return (
        <>
            {/*<HeaderHome/>*/}

            <Container size="xl" mt={30} mb={30}>
                <Flex align="center" justify="space-between">
                    <Link href="/" style={{display: 'contents'}}>
                        <Image
                            component={NextImage}
                            src="/logo.svg"
                            width={125}
                            height={25}
                            fit="contain"
                            alt="Karavan"
                        />
                    </Link>
                    <ModalAuth/>
                </Flex>
            </Container>

            <Container size="xl">
                <Slide/>
            </Container>

            <Container size="xl">
                <AdditionalFeatures/>
            </Container>
            <Box style={{background: '#436CFB'}}>
                <Container size="xl">
                    <UserReviews/>
                </Container>
            </Box>

            <Container size="xl">
                <News/>
            </Container>

            <Container size="xl">
                <SeoText/>
            </Container>

            <HomeFooter/>

        </>
    )
}

export default HomePage;