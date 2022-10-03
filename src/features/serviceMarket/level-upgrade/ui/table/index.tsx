import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Table } from 'shared';
import { ContractDto, EngineerSchema } from 'entities/smartcontract';
import { parseAttrs, getUpgradeType } from 'shared/lib/utils';
import { toLocaleDate } from 'shared/ui/utils';

type Props = {
    contracts: ContractDto[];
};

export const LevelUpgradeContractsTable: FC<Props> = ({ contracts }) => {
    const { t } = useTranslation();

    const dataSource = useMemo(
        () =>
            contracts.map((contract) => ({
                // TODO: what should display first?
                nickName: contract.client || contract.executor || '-',
                key: contract.id,
                id: contract.id,
                type:
                    parseAttrs(contract)?.schema_type ===
                    EngineerSchema.undefined
                        ? '-'
                        : t(
                              `pages.serviceMarket.levelUpgradeTab.type.${getUpgradeType(
                                  { contract }
                              )}`
                          ),
                creationDate: contract.create_time,
                cost: contract.cost_of_execution,
                startOf: contract.start_time,
                penalty: contract.penalty_amount,
            })),
        [t, contracts]
    );

    return (
        <Table
            columns={[
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.nickname'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                    render: (value) => (
                        <Link to={`/user/${value}`}>{value}</Link>
                    ),
                },
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
                    title: t(
                        'pages.serviceMarket.levelUpgradeTab.creationDate'
                    ),
                    dataIndex: 'creationDate',
                    key: 'creationDate',
                    render: (value) => toLocaleDate(value * 1000),
                    sorter: (a, b) => a.creationDate - b.creationDate,
                },
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.cost'),
                    dataIndex: 'cost',
                    key: 'cost',
                    sorter: (a, b) => a.cost - b.cost,
                },
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.penalty'),
                    dataIndex: 'penalty',
                    key: 'penalty',
                    sorter: (a, b) => a.penalty - b.penalty,
                },
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.upgradeType'),
                    dataIndex: 'type',
                    key: 'type',
                    sorter: (a, b) => a.type.length - b.type.length,
                },
                {
                    title: t(
                        'pages.serviceMarket.levelUpgradeTab.startOfOperations'
                    ),
                    dataIndex: 'startOf',
                    key: 'startOf',
                    sorter: (a, b) => a.startOf - b.startOf,
                    render: (value) =>
                        value ? toLocaleDate(value * 1000) : '-',
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
