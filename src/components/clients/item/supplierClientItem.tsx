import {Select, Table} from "@mantine/core";
import {useState} from "react";

const SupplierClientItem = ({data, handleChangeStatus} : SupplierClientItemTypes) => {
    const [value, setValue] = useState<string | null>(String(data.status_id));

    return (
        <>
            <Table.Tr>
                <Table.Td>{data.id}</Table.Td>
                <Table.Td>{data.name}</Table.Td>
                <Table.Td>{data.company}</Table.Td>
                <Table.Td>{data.phone}</Table.Td>
                <Table.Td>{data.chat_id}</Table.Td>
                <Table.Td>
                    <Select
                        checkIconPosition="right"
                        allowDeselect={false}
                        value={value}
                        onChange={(status_id) => {
                            setValue(status_id);
                            handleChangeStatus(data.id, status_id)
                        }}
                        data={[
                            { value: '1', label: 'Неактивен' },
                            { value: '2', label: 'Активен' },
                            { value: '3', label: 'Заблокирован'},
                        ]}
                        w={200}
                    />
                </Table.Td>
            </Table.Tr>
        </>
    )
}

export default SupplierClientItem;