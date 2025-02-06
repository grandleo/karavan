'use client'

import PageWrapper from "@/components/PageWrapper";
import { Loader, Table, TextInput, Center } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useFetchPercentsQuery, useUpdatePercentMutation } from "@/features/percents/api/percentsApi";
import { notify } from "@/utils/notify";

export default function Page() {
    const { data: percents, isLoading } = useFetchPercentsQuery();
    const [updatePercent] = useUpdatePercentMutation();

    const [editing, setEditing] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    // Закрытие инпута при клике вне области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editing !== null && inputRef.current && !inputRef.current.contains(event.target)) {
                setEditing(null); // Закрываем поле, но не отправляем запрос
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [editing]);

    const handleEdit = (id, percent) => {
        setEditing(id);
        setInputValue(percent);
    };

    const handleUpdate = async (id) => {
        if (!inputValue || isNaN(inputValue)) {
            notify("Введите корректное число", "error");
            return;
        }

        try {
            await updatePercent({ id, percent: inputValue }).unwrap();
            notify("Процент обновлён", "success");
        } catch (error) {
            if (error?.data?.errors) {
                const errorMessages = Object.values(error.data.errors).flat().join(" ");
                notify(errorMessages, "error");
            } else {
                notify("Ошибка обновления", "error");
            }
        }

        setEditing(null);
    };

    const handleKeyDown = (event, id) => {
        if (event.key === "Enter") {
            handleUpdate(id);
        }
    };

    return (
        <PageWrapper>
            {isLoading ? (
                <Center style={{ height: "calc(100vh - 120px)" }}> {/* Центрируем Loader */}
                    <Loader size="lg" />
                </Center>
            ) : (
                <Table withBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Имя</Table.Th>
                            <Table.Th>Процент</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {percents?.map(({ id, name, percent }) => (
                            <Table.Tr key={id}>
                                <Table.Td>{name}</Table.Td>
                                <Table.Td>
                                    {editing === id ? (
                                        <div ref={inputRef} style={{ width: "60px" }}>
                                            <TextInput
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(e, id)} // Сохранение по Enter
                                            />
                                        </div>
                                    ) : (
                                        <span
                                            onClick={() => handleEdit(id, percent)}
                                            style={{
                                                cursor: "pointer",
                                                display: "inline-block",
                                                width: "60px",
                                                padding: "4px",
                                            }}
                                        >
                                            {percent}%
                                        </span>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            )}
        </PageWrapper>
    );
}