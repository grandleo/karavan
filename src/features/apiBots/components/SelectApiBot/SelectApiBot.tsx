import {Select} from "@mantine/core";
import {useFetchApiBotsQuery} from "@/features/apiBots/api/apiBotsApi";
import {useEffect, useState} from "react";

interface SelectApiBotProps {
    onSelectBotId: (botId: string) => void;
}

const SelectApiBot = ({ onSelectBotId }: SelectApiBotProps) => {
    const { data: bots, isLoading } = useFetchApiBotsQuery('');
    const [botId, setBotId] = useState<string | null>(null);

    useEffect(() => {
        if (bots && bots.length > 0) {
            const firstBotId = bots[0].id.toString(); // преобразуем id в строку
            setBotId(firstBotId); // выбираем первый бот, если есть данные
            onSelectBotId(firstBotId); // передаем выбранный bot_id как строку в родительский компонент
        }
    }, [bots]);

    if (isLoading || !bots) {
        return <Select disabled placeholder="Загрузка..." />;
    }

    return (
        <Select
            variant="unstyled"
            data={bots?.map((bot: { id: string; name: string }) => ({
                value: bot.id.toString(),
                label: bot.name,
            }))}
            value={botId}
            onChange={(value) => {
                setBotId(value);
                onSelectBotId(value as string);
            }}
            placeholder="Выберите API Bot"
            disabled={!bots || bots.length === 0}
        />
    )
}

export default SelectApiBot;