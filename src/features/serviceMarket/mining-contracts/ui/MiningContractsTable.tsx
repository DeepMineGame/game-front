import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { getDmeAmount, Link, secondsToDays, Table, toLocaleDate } from 'shared';
import { ContractDto } from 'entities/smartcontract';

type Props = {
    contracts: ContractDto[];
};

export const MiningContractsTable: FC<Props> = ({ contracts }) => {
    const { t } = useTranslation();

    return (
        <Table
            columns={[
                {
                    title: t('pages.serviceMarket.id'),
                    dataIndex: 'id',
                    key: 'id',
                    render: (value, props) => (
                        <Link to={`/service-market/contract/${props.key}`}>
                            {value}
                        </Link>
                    ),
                },
                {
                    title: t('pages.serviceMarket.nickname'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                    render: (value) => (
                        <Link to={`/user/${value}`}>{value}</Link>
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
                    render: (value) =>
                        value ? toLocaleDate(value * 1000) : '-',
                },
                {
                    title: t('components.common.duration'),
                    dataIndex: 'duration',
                    key: 'duration',
                    sorter: (a, b) => a.duration - b.duration,
                    render: (value) =>
                        `${value} ${t('components.common.days').toLowerCase()}`,
                },
            ]}
            dataSource={contracts.map((contract) => ({
                key: contract.id,
                nickName: contract.client || contract.executor || '-',
                id: contract.id,
                creationDate: contract.create_time,
                fee: contract.fee_percent,
                penaltyDme: getDmeAmount(contract.penalty_amount),
                miningTerms: `${contract.days_for_penalty}/${
                    contract.fee_daily_min_amount
                } ${t('components.common.button.dme')}`,
                startOf: contract.start_time,
                duration: secondsToDays(contract.contract_duration),
            }))}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
