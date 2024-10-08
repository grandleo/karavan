import {useState} from "react";
import {useRouter} from "next/navigation";
import {removeToken} from "@/features/auth/utils/tokenUtil";
import {removeUser} from "@/features/auth/utils/userUtil";

interface UseLogoutReturn {
    logout: () => void;
    isLoading: boolean;
}

export const useLogout = (): UseLogoutReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const logout = async () => {
        setIsLoading(true);
        try {
            // Удаление токена и данных пользователя
            removeToken();
            removeUser();

            await new Promise((resolve) => setTimeout(resolve, 100));
            // Дополнительно можно очистить состояние пользователя в контексте или глобальном состоянии

            // Перенаправление на страницу входа
            router.push('/'); // Замените на нужный маршрут
        } catch (err) {
            console.error('Logout error:', err);
            // Можно установить сообщение об ошибке, если необходимо
        } finally {
            setIsLoading(false);
        }
    };

    return { logout, isLoading };
};