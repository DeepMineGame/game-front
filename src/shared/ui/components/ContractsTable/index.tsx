import React, { FC } from 'react';
import { serviceMarket } from 'app/router/paths';
import { ContractDto, contractName, statusMap } from 'entities/smartcontract';
import { Link, Table } from '../../ui-kit';
import { toLocaleDate } from '../../utils';

type Props = { contracts: ContractDto[] };

export const ContractsTable: FC<Props> = ({ contracts }) => {
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
                nickName: (
                    <Link to={`${serviceMarket}/contract/${contract.id}`}>
                        {contract.executor || contract.client}
                    </Link>
                ),
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
