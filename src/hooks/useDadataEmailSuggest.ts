import {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import dadataInstance from "@/utils/dadataInstance";

interface EmailSuggestion {
    value: string;
    data: {
        source: string;
        data: {
            domain: string;
            free: boolean;
            suggest: boolean;
        };
    };
}

interface DadataEmailResponse {
    suggestions: EmailSuggestion[];
}

const useDadataEmailSuggest = (query: string) => {
    const [suggestions, setSuggestions] = useState<EmailSuggestion[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const fetchSuggestions = async (query: string) => {
        if (!query || !query.includes('@')) { // Отправлять запрос только после ввода '@'
            setSuggestions([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await dadataInstance.post<DadataEmailResponse>('suggest/email', {
                query,
                count: 5, // Количество предложений
            });

            setSuggestions(response.data.suggestions);
        } catch (err) {
            setError('Ошибка при получении предложений');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Дебаунсинг запросов на 300 мс
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

export default useDadataEmailSuggest;