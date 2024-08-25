import {createContext, ReactNode, useContext, useState} from "react";

// Определение типа контекста
interface LanguageContextType {
    language: string;
    switchLanguage: (lang: string) => void;
}

// Создание контекста с типом
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Пропсы для провайдера языка
interface LanguageProviderProps {
    children: ReactNode; // Используем тип ReactNode для детей
}

// Провайдер контекста языка
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState('ru');

    const switchLanguage = (lang: string) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Хук для использования контекста языка
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage должен использоваться внутри LanguageProvider');
    }
    return context;
};