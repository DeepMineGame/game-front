import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Link, Table, toLocaleDate } from 'shared';
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
    const { t } = useTranslation();

    return (
        <Table
            columns={[
                {
                    title: t('pages.serviceMarket.nickname'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                    render: (value) => (
                        <Link to="/service-market/contract">{value}</Link>
                    ),
                },
                {
                    title: t('pages.serviceMarket.creationDate'),
                    dataIndex: 'creationDate',
                    key: 'creationDate',
                    sorter: (a, b) => a.creationDate - b.creationDate,
                    render: (value) => toLocaleDate(value * 1000),
                },
                {
                    title: t('pages.serviceMarket.createOrder.fee'),
                    dataIndex: 'fee',
                    key: 'fee',
                    sorter: (a, b) => a.fee - b.fee,
                    render: (value) => `${value} %`,
                },
                {
                    title: t('pages.serviceMarket.Penalty&DME'),
                    dataIndex: 'penaltyDme',
                    key: 'penaltyDme',
                    sorter: (a, b) => a.penaltyDme - b.penaltyDme,
                },
                {
                    title: t('pages.serviceMarket.createOrder.miningTerms'),
                    dataIndex: 'miningTerms',
                    key: 'miningTerms',
                },
                {
                    title: t(
                        'pages.serviceMarket.createOrder.startOfOperation'
                    ),
                    dataIndex: 'startOf',
                    key: 'startOf',
                    sorter: (a, b) => a.startOf - b.startOf,
                    render: (value) => toLocaleDate(value * 1000),
                },
                {
                    title: t('components.common.duration'),
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