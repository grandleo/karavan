import {useCallback, useEffect, useState} from "react";
import dadataInstance from "@/utils/dadataInstance";
import {debounce} from "lodash";

interface Suggestion {
    value: string;
    data: {
        surname: string;
        name: string;
        patronymic: string;
        // Добавьте другие поля по необходимости
    };
}

const useDadataSuggestName = (query: string) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const fetchSuggestions = async (query: string) => {
        if (!query || query.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await dadataInstance.post('suggest/fio', {
                query,
                count: 10, // Количество предложений
            });

            setSuggestions(response.data.suggestions);
        } catch (err) {
            setError('Ошибка при получении предложений');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Дебаунсинг запросов, чтобы избежать слишком частых запросов
    const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

    useEffect(() => {
        debouncedFetch(query);

        // Очистка при размонтировании
        return () => {
            debouncedFetch.cancel();
        };
    }, [query, debouncedFetch]);

    return { suggestions, loading, error };
};

export default useDadataSuggestName;