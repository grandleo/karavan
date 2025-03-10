import {Box, Button, Flex, Image, Text} from "@mantine/core";
import classes from "@/components/pages/home/components/slide/slide.module.css";

const Slide = () => {
    return (
        <Box className={classes.slide}>
            <Text
                className={classes.title}
                mb={18}
            >
                B2B-маркетплейс для закупок и оптимизации бизнеса
            </Text>
            <Text className={classes.downloadText} mb={8}>Скачайте приложение</Text>
            <Flex justify="center" gap={12} mb={60}>
                <Button
                    component="a"
                    href="https://apps.apple.com/am/app/karavan/id6740371154"
                    target="_blank"
                >
                    <Image src="/images/apps/appstore.svg"/>
                </Button>
                <Button
                    component="a"
                    href="https://play.google.com/store/apps/details?id=bz.itway.karavan&pcampaignid=web_share"
                    target="_blank"
                >
                    <Image src="/images/apps/googleplay.svg"/>
                </Button>
            </Flex>
            <Box component="picture">
                <Box
                    component="source"
                    media="(max-width: 600px)"
                    srcSet="/images/home/home_slide_375.webp"
                />
                <Box
                    component="source"
                    media="(max-width: 1024px)"
                    srcSet="/images/home/home_slide_768.webp"
                />
                <Image
                    src="/images/home/home_slide_1440.webp"
                    alt="B2B-маркетплейс"
                />
            </Box>
        </Box>
    )
}

export default Slide;