// Импортируем все файлы переводов
import * as ru_global from '@/lang/ru/global';
import * as ru_buttons from '@/lang/ru/buttons';
import * as ru_stock from '@/lang/ru/stock';
import * as ru_api from '@/lang/ru/api';
import * as ru_orders from '@/lang/ru/orders';
import * as ru_clients from '@/lang/ru/clients';
import * as ru_warehouses from '@/lang/ru/warehouses';
import * as ru_auth from '@/lang/ru/auth';
import * as ru_home from '@/lang/ru/home';

import * as en_global from '@/lang/en/global';
import * as en_buttons from '@/lang/en/buttons';
import * as en_stock from '@/lang/en/stock';
import * as en_api from '@/lang/en/api';
import * as en_orders from '@/lang/en/orders';
import * as en_clients from '@/lang/en/clients';
import * as en_warehouses from '@/lang/en/warehouses';
import * as en_auth from '@/lang/en/auth';
import * as en_home from '@/lang/en/home';

// Определяем допустимые языки и имена файлов
export const languages = ['en', 'ru'] as const;
export type Language = typeof languages[number];

export const filenames = ['global', 'buttons', 'stock', 'api', 'orders', 'clients', 'warehouses', 'auth', 'home'] as const;
export type Filename = typeof filenames[number];

// Определяем тип для переводов
type Translation = Record<string, any>;

// Определяем тип для всех переводов
export type AllTranslationsType = {
    [L in Language]: {
        [F in Filename]: Translation;
    };
};

// Создаем объект allTranslations
export const allTranslations: AllTranslationsType = {
    en: {
        global: en_global.translations,
        buttons: en_buttons.translations,
        stock: en_stock.translations,
        api: en_api.translations,
        orders: en_orders.translations,
        clients: en_clients.translations,
        warehouses: en_warehouses.translations,
        auth: en_auth.translations,

        home: en_home.translations,
        // Добавьте другие файлы здесь
    },
    ru: {
        global: ru_global.translations,
        buttons: ru_buttons.translations,
        stock: ru_stock.translations,
        api: ru_api.translations,
        orders: ru_orders.translations,
        clients: ru_clients.translations,
        warehouses: ru_warehouses.translations,
        auth: ru_auth.translations,

        home: ru_home.translations,
        // Добавьте другие файлы здесь
    },
};