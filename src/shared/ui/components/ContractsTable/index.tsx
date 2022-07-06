import React from 'react';
import { ContractDto, contractName, statusMap } from 'entities/smartcontract';
import { Button, Table } from '../../ui-kit';
import { toLocaleDate } from '../../utils';

export const ContractsTable = ({ contracts }: { contracts: ContractDto[] }) => {
    return (
        <Table
            columns={[
                {
                    title: 'Nickname',
                    dataIndex: 'nickName',
                    key: 'nickName',
                },
                {
                    title: 'Reputation',
                    dataIndex: 'reputation',
                    key: 'reputation',
                },
                {
                    title: 'Contract type',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: 'Completion date',
                    dataIndex: 'date',
                    key: 'date',
                },
                {
                    title: 'Penalty, DME',
                    dataIndex: 'penalty',
                    key: 'penalty',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                },
            ]}
            dataSource={contracts.map((contract) => ({
                nickName: <Button type="link">{contract.executor}</Button>,
                key: contract.id,
                reputation: '-',
                type: contractName[contract.type],
                date: toLocaleDate(contract.finishes_at * 1000),
                penalty: contract.penalty_amount,
                status: statusMap[contract.status],
            }))}
        />
    );
};