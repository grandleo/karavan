'use client'

import { useState, useEffect } from 'react';
import {getUser} from "@/features/auth/utils/userUtil";
import {allTranslations, Filename, Language, languages} from "@/lang/translations";
import {useLanguage} from "@/providers/LanguageProvider";

export function useTranslation() {
    const { language } = useLanguage(); // Язык из контекста
    const [lang, setLang] = useState<Language>('ru');

    useEffect(() => {
        // Пытаемся получить предпочтительный язык пользователя
        getUser().then((user) => {
            const userLang = (user as any)?.lang;
            if (userLang && languages.includes(userLang)) {
                setLang(userLang as Language); // Если есть язык пользователя, используем его
            } else {
                setLang(language as Language || 'ru'); // Иначе используем язык из контекста или 'ru' по умолчанию
            }
        });
    }, [language]);

    //
    // useEffect(() => {
    //     if (!fallbackLang) {
    //         // Получаем предпочтительный язык пользователя
    //         getUser().then((user) => {
    //             const userLang = (user as any)?.lang;
    //             if (userLang && languages.includes(userLang)) {
    //                 setLang(userLang as Language);
    //             } else {
    //                 setLang('ru');
    //             }
    //         });
    //     }
    // }, [fallbackLang]);

    const trans = (filename: Filename, key: string): string => {
        const getTranslation = (language: Language): any => {
            const translationFile = allTranslations[language]?.[filename];
            if (!translationFile) return undefined;

            return key.split('.').reduce((obj, k) => (obj ? obj[k] : undefined), translationFile);
        };

        let translation = getTranslation(lang);

        if (translation === undefined && lang !== 'ru') {
            // Если перевод отсутствует на языке пользователя, используем 'ru'
            translation = getTranslation('ru');
        }

        return translation !== undefined ? translation : key;
    };

    return { trans };
}