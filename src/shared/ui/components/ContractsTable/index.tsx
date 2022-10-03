import { FC, useMemo } from 'react';
import { serviceMarket } from 'app/router/paths';
import { t } from 'i18next';
import { ContractState } from 'features';
import { DiscordIcon } from 'shared';
import { Space, Tooltip } from 'antd';
import {
    ContractDto,
    contractName,
    getContractStatus,
} from 'entities/smartcontract';
import { getUserRoleInContract } from 'shared/lib/utils';
import { Link, Table, Tag } from '../../ui-kit';
import { toLocaleDate } from '../../utils';

type Props = { contracts: ContractDto[]; account: string };

export const ContractsTable: FC<Props> = ({ contracts, account }) => {
    const dataSource = useMemo(
        () =>
            contracts.map((contract) => {
                const contractStatus = getContractStatus(contract, account);
                return {
                    nickName: contract.client || contract.executor || '-',
                    key: contract.id,
                    id: contract.id,
                    reputation: '-',
                    type: contractName[contract.type],
                    date:
                        contract.finishes_at === 0
                            ? '-'
                            : toLocaleDate(contract.finishes_at * 1000),
                    penalty: contract.penalty_amount,
                    status: {
                        label: (
                            <ContractState
                                contract={contract}
                                accountName={account}
                            />
                        ),
                        value: contractStatus,
                    },
                    contract,
                };
            }),
        [account, contracts]
    );

    return (
        <Table
            columns={[
                {
                    title: t('pages.serviceMarket.nickname'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                    render: (value, { contract }) => {
                        const partnerNickname =
                            contract.client === account
                                ? contract.executor
                                : contract.client;
                        const role = !partnerNickname
                            ? null
                            : getUserRoleInContract(contract, partnerNickname);

                        return (
                            <Space align="start" size="large">
                                <Tooltip
                                    overlay={t('components.common.comingSoon')}
                                >
                                    <DiscordIcon cursor="pointer" />
                                </Tooltip>
                                <Space align="center" size={0}>
                                    <Link to={`/user/${partnerNickname}`}>
                                        {partnerNickname || '-'}
                                    </Link>
                                    {role && (
                                        <Tag kind="secondary">
                                            {t(
                                                `roles.${
                                                    role ===
                                                        'mineOwnerContractor' ||
                                                    role === 'mineOwnerLandlord'
                                                        ? 'mineowner'
                                                        : role
                                                }`
                                            )}
                                        </Tag>
                                    )}
                                </Space>
                            </Space>
                        );
                    },
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
                        a.status.value.value.length -
                        b.status.value.value.length,
                    render: ({ label }) => label,
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'], pageSize: 5 }}
        />
    );
};
