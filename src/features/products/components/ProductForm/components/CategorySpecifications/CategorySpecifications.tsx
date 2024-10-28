import {Control, Controller} from "react-hook-form";
import {useEffect} from "react";
import {Box, MultiSelect, Select, TextInput} from "@mantine/core";

interface SpecificationValue {
    id: number;
    value: string;
    order_column: number;
}

interface Specification {
    id: number;
    name: string;
    is_title_part: number;
    selection_type: "single" | "multiple";
    is_required: number;
    order_column: number;
    values: SpecificationValue[];
}

interface CategorySpecificationsProps {
    categorySpecifications: Specification[];
    control: Control<any>;
    setValue: (name: string, value: any) => void;
    watchedSpecifications: any;
}

const CategorySpecifications = ({
                                    categorySpecifications,
                                    control,
                                    setValue,
                                    watchedSpecifications,
                                }: CategorySpecificationsProps) => {

    useEffect(() => {
        if (categorySpecifications) {
            // Фильтруем спецификации, участвующие в названии
            const titleSpecs = categorySpecifications
                .filter((spec) => spec.is_title_part === 1)
                .sort((a, b) => (a.order_column || 0) - (b.order_column || 0));

            const nameParts: string[] = [];

            titleSpecs.forEach((spec) => {
                const selected = watchedSpecifications[spec.id];
                if (selected) {
                    if (spec.selection_type === "single") {
                        const value = spec.values.find((val) => val.id === Number(selected));
                        if (value) {
                            nameParts.push(value.value);
                        }
                    } else if (spec.selection_type === "multiple" && Array.isArray(selected)) {
                        // Сортируем выбранные значения по order_column
                        const sortedSelectedValues = spec.values
                            .filter((val) => selected.includes(val.id.toString()))
                            .sort((a, b) => a.order_column - b.order_column)
                            .map((val) => val.value);
                        nameParts.push(sortedSelectedValues.join(" "));
                    }
                }
            });

            const generatedName = nameParts.join(" ");
            setValue("name", generatedName);
        }
    }, [watchedSpecifications, categorySpecifications, setValue]);

    return (
        <>
            <Box>
                {categorySpecifications.map((spec) => (
                    <Box key={spec.id} mb="md">
                        <Controller
                            name={`specifications.${spec.id}`}
                            control={control}
                            rules={{
                                required: spec.is_required === 1,
                            }}
                            render={({ field }) => {
                                const selectData = spec.values.map((val) => ({
                                    value: val.id.toString(),
                                    label: val.value,
                                }));

                                if (spec.selection_type === "single") {
                                    return (
                                        <Select
                                            {...field}
                                            label={spec.name}
                                            placeholder={`Выберите ${spec.name}`}
                                            data={selectData}
                                            value={field.value || ""}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    );
                                } else if (spec.selection_type === "multiple") {
                                    return (
                                        <MultiSelect
                                            {...field}
                                            label={spec.name}
                                            placeholder={`Выберите ${spec.name}`}
                                            data={selectData}
                                            value={field.value || []}
                                            onChange={(values) => field.onChange(values)}
                                        />
                                    );
                                }
                                return null;
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default CategorySpecifications;