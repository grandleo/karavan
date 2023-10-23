import {useState} from "react";
import {SortableItem} from "@/components/ui/sortableList/SortableItem";
import SpecificationItem from "@/components/ui/specifications/SpecificationItem";
import {SortableList} from "@/components/ui/sortableList/SortableList";
import ValueSpecificationItem from "@/components/ui/specifications/ValueSpecificationItem";
import {Button} from "@mantine/core";

interface IValue {
    id: number;
    value: string;
}

const ValuesSpecificationItem = () => {
    const [values, setValues] = useState<IValue[]>([{id: 1, value: ""}]);

    const handleAddValue = () => {
        setValues([...values, { id: 0, value: "" }]);
    };

    const handleRemoveClick = (index: number, id: number) => {
        const list = [...values];
        list.splice(index, 1);
        setValues(list);
    };

    const onSubmit = async (data: IValue[]) => {

    }

    return (
        <>
            <Button onClick={handleAddValue}>+</Button>
            <SortableList items={values} onChange={setValues} renderItem={(item, index) => {
                return (
                    <SortableItem id={item.id}>
                        <ValueSpecificationItem removeItem={handleRemoveClick(index, item.id)}/>
                    </SortableItem>
                )
            {/*    return (*/}
            {/*        <SortableItem id={item.id}>*/}
            {/*            /!*<SpecificationItem item={item} onOpen={open} setSpecification={setSpecification}/>*!/*/}
            {/*            <ValuesSpecificationItem/>*/}
            {/*        </SortableItem>*/}
            {/*    )*/}
            }}/>
        </>
    )
}

export default ValuesSpecificationItem;