import {useEffect, useState} from 'react';
import { Button, Stack, Text, Skeleton } from '@mantine/core';
import {useLazyFetchClientCategoriesQuery} from "@/features/categories/api/categoriesApi";

interface TelegramCategorySelectorProps {
    onSelectCategory: (category: any, level: number) => void;
}

const TelegramCategorySelector: React.FC<TelegramCategorySelectorProps> = ({
                                                                               onSelectCategory,
                                                                           }) => {
    const [fetchCategories, { data: categories, isFetching, isError, error }] =
        useLazyFetchClientCategoriesQuery();
    const [categoryLevels, setCategoryLevels] = useState<any[][]>([[]]);
    const [activeCategories, setActiveCategories] = useState<Record<number, number>>({}); // Активные категории по уровням
    const [loadingCategoryId, setLoadingCategoryId] = useState<number | null>(null); // ID категории, которая грузится

    const handleCategoryClick = async (category: any, level: number) => {
        // Устанавливаем активную категорию и состояние загрузки
        setActiveCategories((prev) => ({ ...prev, [level]: category.id }));
        setLoadingCategoryId(category.id);

        if (category.children_count === 0) {
            onSelectCategory(category, level);
            setLoadingCategoryId(null); // Убираем состояние загрузки
        } else {
            const { data } = await fetchCategories(category.id);
            setLoadingCategoryId(null); // Убираем состояние загрузки
            if (data) {
                setCategoryLevels((prev) => {
                    const updatedLevels = [...prev];
                    updatedLevels[level + 1] = data;
                    return updatedLevels.slice(0, level + 2);
                });
            }
        }
    };

    // Первоначальная загрузка категорий
    const loadInitialCategories = async () => {
        const { data } = await fetchCategories(0);
        if (data) {
            setCategoryLevels([data]);
        }
    };

    // Загрузка при первом рендере
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadInitialCategories();
        }, 500); // Задержка 500 мс

        return () => clearTimeout(timeoutId); // Очищаем таймер при размонтировании или изменении компонента
    }, []);

    return (
        <>
            {isError && <Text color="red">Ошибка: {error?.message || 'Неизвестная ошибка'}</Text>}

            {categoryLevels.map((categories, level) => (
                <div key={level} style={{ marginBottom: '2rem' }}>
                    <Text weight={700} size="md" style={{ marginBottom: '0.5rem' }}>
                        {level === 0
                            ? 'Выберите категорию'
                            : `Выберите подкатегорию уровня ${level}`}
                    </Text>
                    <Stack spacing="sm">
                        {categories.map((category) => (
                            <Button
                                variant={activeCategories[level] === category.id ? 'outline' : 'default'}
                                fullWidth
                                key={category.id}
                                onClick={() => handleCategoryClick(category, level)}
                                loading={loadingCategoryId === category.id}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </Stack>
                </div>
            ))}

            {/* Skeleton всегда внизу, когда идет загрузка */}
            {isFetching && (
                <Stack spacing="sm">
                    <Skeleton height={40} radius="md" />
                    <Skeleton height={40} radius="md" />
                    <Skeleton height={40} radius="md" />
                </Stack>
            )}
        </>
    );
};

export default TelegramCategorySelector;