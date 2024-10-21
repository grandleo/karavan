'use client'

import PageWrapper from "@/components/PageWrapper";
import {Button, Table} from "@mantine/core";
import NomenclatureProductRow from "@/features/products/components/NomenclatureProductRow/NomenclatureProductRow";
import React from "react";

const NomenclaturePage = () => {
    return (
        <>
            <PageWrapper
                sidebarBg="white"
                sidebarContent={
                    <>Номенклатура</>
                }
            >
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>№</Table.Th>
                            <Table.Th>Наименование</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <NomenclatureProductRow/>
                    </Table.Tbody>
                </Table>
            </PageWrapper>
        </>
    )
}

export default NomenclaturePage;