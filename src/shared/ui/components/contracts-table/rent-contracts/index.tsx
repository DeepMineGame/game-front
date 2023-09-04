import React, { FC, SyntheticEvent, useMemo } from 'react';
import { t } from 'i18next';
import {
    DiscordIcon,
    stateIconMap,
    useAccountName,
    useSearchByNickNameTableProps,
} from 'shared';
import { Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import {
    ContractDto,
    contractName,
    ContractType,
    OrderState,
    stateMap,
} from 'entities/smartcontract';

import { Link, Table } from '../../../ui-kit';
import { toLocaleDate } from '../../../utils';
import styles from '../styles.module.scss';

type Props = { contracts: ContractDto[] | null };

export const RentContracts: FC<Props> = ({ contracts }) => {
    const nicknameSearchProps = useSearchByNickNameTableProps();

    const navigate = useNavigate();
    const accountName = useAccountName();
    const account = useAccountName();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                return {
                    key: contract.id,
                    id: contract.id,
                    fee:
                        contract.type === ContractType.level_upgrade
                            ? contract.cost_of_execution / 10 ** 8
                            : contract.fee_percent,
                    date: toLocaleDate(contract.create_time * 1000),
                    contractType: contractName[contract.type],
                    status: {
                        value: contract.state,
                        component: (
                            <Space>
                                {stateIconMap[contract.state]}{' '}
                                {stateMap[contract.state]}
                            </Space>
                        ),
                    },
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
                    title: t('Contract ID'),
                    dataIndex: 'id',
                    key: 'id',
                    render: (value, props) => (
                        <Link to={`/service-market/contract/${props.key}`}>
                            {value}
                        </Link>
                    ),
                },
                {
                    title: t('Nickname'),
                    ...nicknameSearchProps,
                    dataIndex: 'nickName',
                    width: 300,
                    key: 'nickName',
                    render: (_, { contract }) => {
                        const nick =
                            contract.client === accountName
                                ? contract.executor
                                : contract.client;
                        const discord =
                            contract.client === accountName
                                ? contract.executor_discord
                                : contract.client_discord;
                        return (
                            <Space align="start" size="large">
                                {contract.executor_discord && (
                                    <Tooltip
                                        overlay={
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(
                                                        discord
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
                                                    {discord} <CopyOutlined />
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
                                    {nick ? (
                                        <Link
                                            to={`/user/${nick}`}
                                            onClick={stopPropagateEvent}
                                        >
                                            {nick}
                                        </Link>
                                    ) : (
                                        t('Not assigned yet')
                                    )}
                                </Space>
                            </Space>
                        );
                    },
                },
                {
                    title: t('Contract type'),
                    dataIndex: 'contractType',
                    key: 'contractType',
                    filters: [
                        {
                            text: contractName[ContractType.landlord_mineowner],
                            value: contractName[
                                ContractType.landlord_mineowner
                            ],
                        },
                        {
                            text: contractName[
                                ContractType.mineowner_contractor
                            ],
                            value: contractName[
                                ContractType.mineowner_contractor
                            ],
                        },
                        {
                            text: contractName[ContractType.level_upgrade],
                            value: contractName[ContractType.level_upgrade],
                        },
                    ],
                    onFilter: (value, record) => record.contractType === value,
                },
                {
                    title: t('Creation date'),
                    dataIndex: 'date',
                    key: 'date',
                    sorter: (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                },
                {
                    title: t('Fee, %'),
                    dataIndex: 'fee',
                    key: 'fee',
                    sorter: (a, b) => a.fee - b.fee,
                },
                {
                    title: t('Status'),
                    dataIndex: 'status',
                    key: 'status',
                    filters: [
                        {
                            text: stateMap[OrderState.OpenOrder],
                            value: OrderState.OpenOrder,
                        },
                        {
                            text: stateMap[OrderState.ValidContract],
                            value: OrderState.ValidContract,
                        },
                        {
                            text: stateMap[OrderState.Completed],
                            value: OrderState.Completed,
                        },
                        {
                            text: stateMap[OrderState.Terminated],
                            value: OrderState.Terminated,
                        },
                        {
                            text: stateMap[OrderState.WaitingForAction],
                            value: OrderState.WaitingForAction,
                        },
                    ],
                    onFilter: (value, record) => record.status.value === value,
                    render: ({ component }) => component,
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'] }}
        />
    );
};
