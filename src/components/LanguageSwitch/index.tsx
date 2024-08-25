// Интерфейс для данных выбора
import {Avatar, Group, Select, SelectProps, Text} from "@mantine/core";
import {useLanguage} from "@/provider/LanguageProvider";
import {IconCaretDown, IconCaretDownFilled, IconCheck, IconChevronDown} from "@tabler/icons-react";
import classes from "@/components/LanguageSwitch/style.module.css";

interface LanguageItem {
    label: string;
    value: string;
    image: string;
}

// Данные для выбора языка
const data: LanguageItem[] = [
    { label: 'Рус', value: 'ru', image: '/images/flags/ru.svg' },
    { label: 'Eng', value: 'eng', image: '/images/flags/eng.svg' },
];

const iconProps = {
    stroke: 1.5,
    color: 'currentColor',
    opacity: 0.6,
    size: 18,
};

// Функция для рендера элемента с картинкой
const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => {
    // Преобразуем item в LanguageItem для доступа к image и label
    const item = option as LanguageItem;

    return (
        <Group flex="1" gap="xs">
            <Avatar src={item.image} size="xs" />
            {item.label}
            {checked && <IconCheck style={{ marginInlineStart: 'auto' }} {...iconProps} />}
        </Group>
    )
};

const LanguageSwitch = () => {
    const { language, switchLanguage } = useLanguage();

    // Найти текущий выбранный язык
    const selectedItem = data.find(item => item.value === language);

    return (
        <Select
            value={language}
            onChange={(lang) => switchLanguage(lang!)}
            data={data}
            withCheckIcon={false}
            maxDropdownHeight={400}
            renderOption={renderSelectOption} // Компонент для опций в выпадающем списке
            leftSection={selectedItem ? <Avatar src={selectedItem.image} size="xs" /> : null} // Динамическое отображение выбранного значения
            rightSection={<IconChevronDown stroke={1} />}
            classNames={{
                root: classes.langSwitch,
                input: classes.langSwitchInput,
            }}
        />
    );
}

export default LanguageSwitch;