import React, { FC } from 'react';
import { Button, Table, toLocaleDate } from 'shared';
import { ContractDto } from 'entities/smartcontract';

type Props = {
    contracts: ContractDto[];
};

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

const calcDuration = (contract: ContractDto) =>
    Math.floor(
        (contract.finishes_at - contract.create_time) / ONE_DAY_IN_SECONDS
    );

export const MiningContractsTable: FC<Props> = ({ contracts }) => {
    return (
        <Table
            columns={[
                {
                    title: 'Nickname',
                    dataIndex: 'nickName',
                    key: 'nickName',
                    render: (value) => <Button type="link">{value}</Button>,
                },
                {
                    title: 'Creation date',
                    dataIndex: 'creationDate',
                    key: 'creationDate',
                    sorter: (a, b) => a.creationDate - b.creationDate,
                    render: (value) => toLocaleDate(value * 1000),
                },
                {
                    title: 'Fee',
                    dataIndex: 'fee',
                    key: 'fee',
                    sorter: (a, b) => a.fee - b.fee,
                    render: (value) => `${value} %`,
                },
                {
                    title: 'Penalty, DME',
                    dataIndex: 'penaltyDme',
                    key: 'penaltyDme',
                    sorter: (a, b) => a.penaltyDme - b.penaltyDme,
                },
                {
                    title: 'Mining terms',
                    dataIndex: 'miningTerms',
                    key: 'miningTerms',
                },
                {
                    title: 'Start of operations',
                    dataIndex: 'startOf',
                    key: 'startOf',
                    sorter: (a, b) => a.startOf - b.startOf,
                    render: (value) => toLocaleDate(value * 1000),
                },
                {
                    title: 'Duration',
                    dataIndex: 'duration',
                    key: 'duration',
                    sorter: (a, b) => a.duration - b.duration,
                    render: (value) => `${value} days`,
                },
            ]}
            dataSource={contracts.map((contract) => ({
                key: contract.id,
                nickName: contract.client || contract.executor || '-',
                creationDate: contract.create_time,
                fee: contract.fee_percent,
                penaltyDme: contract.penalty_amount,
                miningTerms: `${contract.days_for_penalty}/${contract.fee_daily_min_amount} DME`,
                startOf: contract.start_time,
                duration: calcDuration(contract),
            }))}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
