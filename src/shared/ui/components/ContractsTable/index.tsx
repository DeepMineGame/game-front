import { FC, useMemo, SyntheticEvent } from 'react';
import { t } from 'i18next';
import { DiscordIcon, useAccountName } from 'shared';
import { Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import { ContractState, UpgradeContractState } from 'features/service-market';
import {
    ContractDto,
    contractName,
    ContractType,
    getContractStatus,
} from 'entities/smartcontract';

import { getUserRoleInContract } from 'shared/lib/utils';
import { Link, Table, Tag } from '../../ui-kit';
import { toLocaleDate } from '../../utils';
import styles from './styles.module.scss';

type Props = { contracts: ContractDto[] | null };

const contractStateMap = {
    [ContractType.undefined]: () => null,
    [ContractType.landlord_mineowner]: ContractState,
    [ContractType.mineowner_contractor]: ContractState,
    [ContractType.level_upgrade]: UpgradeContractState,
};

// const rarityColorMap = {
//     0: undefined,
//     1: '#DBDBDB', // neutral9
//     2: '#09E001', // green4
//     3: '#0089FF', // geekblue5
//     4: '#CB2EFF', // purple6
//     5: '#E8D639', // yellow7,
// };

export const ContractsTable: FC<Props> = ({ contracts }) => {
    const navigate = useNavigate();
    const account = useAccountName();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                const contractStatus = getContractStatus(contract, account);
                const Status = contractStateMap[contract.type];

                return {
                    cost: contract.cost_of_execution,
                    // rarity: contract.rarity,
                    // level: contract.level,
                    nickName: contract.client || contract.executor,
                    key: contract.id,
                    id: contract.id,
                    type: contractName[contract.type],
                    fee: contract.fee_percent,
                    date:
                        contract.finishes_at === 0
                            ? '-'
                            : toLocaleDate(contract.finishes_at * 1000),
                    status: {
                        label: (
                            <Status contract={contract} accountName={account} />
                        ),
                        value: contractStatus,
                    },
                    discord: contract.client_discord,
                    contract,
                };
            }),
        [account, contracts]
    );

    const stopPropagateEvent = (event: SyntheticEvent<any>) =>
        event.stopPropagation();

    return (
        <Table
            onRow={(record) => ({
                onClick: () => {
                    navigate(`/service-market/contract/${record.id}`);
                },
            })}
            rowClassName={() => styles.row}
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
                    title: t('pages.serviceMarket.myContractsTab.nickname'),
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
                                {contract.client_discord && (
                                    <Tooltip
                                        overlay={
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(
                                                        contract.client_discord
                                                    );
                                                }}
                                                className={styles.pointer}
                                            >
                                                <Tooltip
                                                    trigger="click"
                                                    overlay={t(
                                                        'pages.info.copied'
                                                    )}
                                                >
                                                    {contract.client_discord}{' '}
                                                    <CopyOutlined />
                                                </Tooltip>
                                            </div>
                                        }
                                    >
                                        <DiscordIcon
                                            cursor="pointer"
                                            onClick={stopPropagateEvent}
                                        />
                                    </Tooltip>
                                )}
                                <Space align="center" size={0}>
                                    <Link
                                        to={`/user/${
                                            partnerNickname ||
                                            contract.executor ||
                                            contract.client
                                        }`}
                                        onClick={stopPropagateEvent}
                                    >
                                        {partnerNickname ||
                                            contract.executor ||
                                            contract.client}
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
                // {
                //     title: 'Rarity',
                //     dataIndex: 'rarity',
                //     key: 'rarity',
                //     render: (rarity: -1 | 1 | 2 | 3 | 4 | 5) =>
                //         rarity === -1 ? (
                //             'N/A'
                //         ) : (
                //             <div
                //                 className={styles.rarityMarker}
                //                 style={{ background: rarityColorMap[rarity] }}
                //             />
                //         ),
                // },
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
                    title: t('pages.serviceMarket.myContractsTab.fee'),
                    dataIndex: 'fee',
                    key: 'fee',
                    sorter: (a, b) => a.fee - b.fee,
                },
                {
                    title: t('pages.serviceMarket.myContractsTab.cost'),
                    dataIndex: 'cost',
                    key: 'const',
                    sorter: (a, b) => a.const - b.cost,
                },
                // {
                //     title: 'Mine level',
                //     dataIndex: 'level',
                //     key: 'level',
                //     render: (level) => (level === -1 ? 'N/A' : level),
                // },
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
            pagination={{ position: ['bottomCenter'] }}
        />
    );
};
