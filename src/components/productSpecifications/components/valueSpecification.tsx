import {ActionIcon, Flex, TextInput} from "@mantine/core";
import {TreeSortable} from "@/components/treeSortable";
import classes from "@/components/productSpecifications/productSpecifications.module.css";
import {Controller, useFormContext} from "react-hook-form";
import {IconTrash} from "@tabler/icons-react";
import {ValueSpecificationProps} from "@/components/productSpecifications/types";

const ValueSpecification = ({index, onRemove, canRemove, value}: ValueSpecificationProps) => {
    const {control} = useFormContext();

    return (
        <Flex
            gap={8}
            align="center"
            className={classes.valueSpecification}
        >
            <TreeSortable.DragHandle active={true}/>
            <Controller
                name={`values.${index}.value`}
                control={control}
                rules={{
                        required: "Поле обязательно для заполнения",
                    }}
                render={({field : {onChange}, fieldState: {error}}) => {
                    return (
                        <TextInput
                            value={value}
                            onChange={(event) => {
                                onChange(event.currentTarget.value.trimStart());
                            }}
                            placeholder="Значение"
                            classNames={{
                                root: classes.valueSpecificationInput,
                                wrapper: classes.valueSpecificationInputWrapper,
                            }}
                            error={error?.message}
                        />
                    )
                }}
            />
            {canRemove &&
                <ActionIcon variant="outline" color="red" aria-label="Удалить" onClick={onRemove}>
                    <IconTrash stroke={1} style={{width: '70%', height: '70%'}}/>
                </ActionIcon>
            }
        </Flex>
    )
}

export default ValueSpecification;