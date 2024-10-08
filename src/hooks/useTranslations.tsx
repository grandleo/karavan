import {useEffect, useState} from "react";
import {useLanguage} from "@/providers/LanguageProvider";

export const useTranslations = (page: string) => {
    const { language } = useLanguage();
    const [translations, setTranslations] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                let loadedTranslations;

                // Заменяем .js на .ts
                if (language === 'ru') {
                    loadedTranslations = await import(`../lang/${page}/ru.ts`);
                } else if (language === 'eng') {
                    loadedTranslations = await import(`../lang/${page}/eng.ts`);
                }

                setTranslations(loadedTranslations?.translations || {});
            } catch (error) {
                console.error(`Ошибка при загрузке переводов для страницы: ${page}`, error);
                setTranslations({});
            } finally {
                setLoading(false);
            }
        };

        fetchTranslations();
    }, [page, language]);

    return { translations, loading };
};