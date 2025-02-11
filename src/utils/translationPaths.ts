type TranslationModules = {
    [language: string]: {
        [file: string]: () => Promise<{ translations: Record<string, any> }>;
    };
};

const translationPaths: TranslationModules = {
    ru: {
        global: () => import('@/lang/ru/global'),
        buttons: () => import('@/lang/ru/buttons'),
        auth: () => import('@/lang/ru/auth'),
        home: () => import('@/lang/ru/home'),
        stock: () => import('@/lang/ru/stock'),
        privacy: () => import('@/lang/ru/privacy'),
        // Добавьте другие файлы для русского языка здесь
    },
    en: {
        global: () => import('@/lang/en/global'),
        buttons: () => import('@/lang/en/buttons'),
        auth: () => import('@/lang/en/auth'),
        home: () => import('@/lang/en/home'),
        stock: () => import('@/lang/en/stock'),
        privacy: () => import('@/lang/en/privacy'),
        // Добавьте другие файлы для английского языка здесь
    },
    // Добавьте другие языки при необходимости
};

export default translationPaths;