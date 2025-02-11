import TelegramWebAppProvider from "@/providers/TelegramWebAppProvider";
import Script from "next/script";

export default function TelegramLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            {/* Добавление Telegram WebApp Script */}
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
            />
            <TelegramWebAppProvider>
                {children}
            </TelegramWebAppProvider>
        </>
    );
}