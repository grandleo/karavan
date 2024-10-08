/**
 * Приводит каждое слово строки к заглавной букве.
 * @param str - Исходная строка.
 * @returns Строка с заглавными буквами в начале каждого слова.
 */
export const capitalizeWords = (str: string): string => {
    return str
        .split(' ')
        .map(word => word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : '')
        .join(' ');
};

/**
 * Очищает ввод email, оставляя только допустимые символы.
 * Разрешает только латинские буквы, цифры, символы @, ., -, _, + и т.д.
 * @param email - Исходная строка email.
 * @returns Очищенная строка email.
 */
export const sanitizeEmail = (email: string): string => {
    // Разрешаем только латинские буквы, цифры и специальные символы для email
    return email.replace(/[^a-zA-Z0-9@.\-_+]/g, '');
};

/**
 * Форматирует номер телефона, удаляя нецифровые символы и начальные цифры 7 или 8.
 * @param phone - Входной номер телефона.
 * @returns Отформатированный номер телефона.
 */
export const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');

    if (digits.startsWith('7') || digits.startsWith('8')) {
        return digits.slice(1);
    }

    return digits;
};

/**
 * Обрабатывает вставку текста в поле ввода номера телефона.
 * Форматирует вставленный текст и обновляет значение поля.
 * @param event - Событие вставки из буфера обмена.
 * @param onChange - Функция для обновления значения поля.
 */
export const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    onChange: (value: string) => void
): void => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('Text');
    const formattedPhoneNumber = formatPhoneNumber(pastedText);
    onChange(formattedPhoneNumber);
};