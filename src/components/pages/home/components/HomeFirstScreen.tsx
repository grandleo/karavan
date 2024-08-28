import {Box, Container, Text} from "@mantine/core";
import classes from "@/components/pages/home/style.module.css";
import {HeaderHome} from "@/components/ui/header";
import {useLanguage} from "@/provider/LanguageProvider";
import {useTranslations} from "@/hooks/useTranslations";


const HomeFirstScreen = () => {
    const { translations, loading } = useTranslations('home');

    if (loading) {
        return <div>Loading...</div>; // Пока загружаются переводы, показываем loader
    }

    return (
        <>
            <Container size="md">
                <Text className={classes.title}>
                    {translations.title}
                </Text>
                <Text className={classes.subTitle} visibleFrom="xs">
                    Программное обеспечение и сервисы функционируют вместе, чтобы обеспечить поставщикам и клиентам
                    оптимальные условия для сотрудничества.
                </Text>
            </Container>
        </>
    )
}

export default HomeFirstScreen;