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

type Props = {
    contracts: ContractDto[];
    accountName: string;
};

export const LevelUpgradeContractsTable: FC<Props> = ({
    contracts,
    accountName,
}) => {
    const dataSource = useMemo(
        () =>
            contracts.map((contract) => {
                const partnerNickname =
                    contract.client === accountName
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
                    reputation: '-',
                    type: contractName[contract.type],
                    date:
                        contract.finishes_at === 0
                            ? '-'
                            : toLocaleDate(contract.finishes_at * 1000),
                    penalty: contract.penalty_amount,
                    status: (
                        <ContractState
                            contract={contract}
                            accountName={accountName}
                        />
                    ),
                };
            }),
        [accountName, contracts]
    );

    return (
        <Table
            columns={[
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.nickname'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                },
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.reputation'),
                    dataIndex: 'reputation',
                    key: 'reputation',
                },
                {
                    title: t(
                        'pages.serviceMarket.levelUpgradeTab.creationDate'
                    ),
                    dataIndex: 'creationDate',
                    key: 'creationDate',
                },
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.cost'),
                    dataIndex: 'cost',
                    key: 'cost',
                },
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.penalty'),
                    dataIndex: 'penalty',
                    key: 'penalty',
                },
                {
                    title: t('pages.serviceMarket.levelUpgradeTab.upgradeType'),
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: t(
                        'pages.serviceMarket.levelUpgradeTab.startOfOperations'
                    ),
                    dataIndex: 'startOfOperations',
                    key: 'startOfOperations',
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
