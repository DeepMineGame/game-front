import { FC, useMemo } from 'react';
import { serviceMarket } from 'app/router/paths';
import { t } from 'i18next';
import { ContractState } from 'features';
import { DiscordIcon } from 'shared';
import { Space, Tooltip } from 'antd';
import { ContractDto, contractName } from 'entities/smartcontract';
import { getUserRoleInContract } from 'shared/lib/utils';
import { Link, Table, Tag } from '../../ui-kit';
import { toLocaleDate } from '../../utils';

type Props = { contracts: ContractDto[]; account: string };

export const ContractsTable: FC<Props> = ({ contracts, account }) => {
    const dataSource = useMemo(
        () =>
            contracts.map((contract) => {
                const partnerNickname =
                    contract.client === account
                        ? contract.executor
                        : contract.client;
                const role = !partnerNickname
                    ? null
                    : getUserRoleInContract(contract, partnerNickname);

                return {
                    nickName: (
                        <Space align="start" size="large">
                            <Tooltip
                                overlay={t('components.common.comingSoon')}
                            >
                                <DiscordIcon cursor="pointer" />
                            </Tooltip>
                            <Space align="center" size={0}>
                                <Link
                                    to={`${serviceMarket}/contract/${contract.id}`}
                                >
                                    {partnerNickname || '-'}
                                </Link>
                                {role && (
                                    <Tag kind="secondary">
                                        {t(
                                            `roles.${
                                                role ===
                                                    'mineOwnerContractor' ||
                                                role === 'mineOwnerLandlord'
                                                    ? 'mineOwner'
                                                    : role
                                            }`
                                        )}
                                    </Tag>
                                )}
                            </Space>
                        </Space>
                    ),
                    key: contract.id,
                    type: contractName[contract.type],
                    date:
                        contract.finishes_at === 0
                            ? '-'
                            : toLocaleDate(contract.finishes_at * 1000),
                    penalty: contract.penalty_amount,
                    status: (
                        <ContractState
                            contract={contract}
                            accountName={account}
                        />
                    ),
                };
            }),
        [account, contracts]
    );

    return (
        <Table
            columns={[
                {
                    title: t('pages.serviceMarket.myContractsTab.nickname'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                },
                {
                    title: t('pages.serviceMarket.myContractsTab.contractType'),
                    dataIndex: 'type',
                    key: 'type',
                    sorter: (a, b) => a.type.length - b.type.length,
                },
                {
                    title: t(
                        'pages.serviceMarket.myContractsTab.completionDate'
                    ),
                    dataIndex: 'date',
                    key: 'date',
                    sorter: (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                },
                {
                    title: t('pages.serviceMarket.myContractsTab.penalty'),
                    dataIndex: 'penalty',
                    key: 'penalty',
                    sorter: (a, b) => a.penalty - b.penalty,
                },
                {
                    title: t('pages.serviceMarket.myContractsTab.status'),
                    dataIndex: 'status',
                    key: 'status',
                    sorter: (a, b) =>
                        a.status.props.contractStatus.value.length -
                        b.status.props.contractStatus.value.length,
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
