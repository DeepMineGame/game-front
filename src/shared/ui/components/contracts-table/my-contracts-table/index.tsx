import React, { FC, useMemo, SyntheticEvent } from 'react';
import { t } from 'i18next';
import { DiscordIcon, useAccountName } from 'shared';
import { Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CopyOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import {
    ContractDto,
    contractName,
    OrderState,
    stateMap,
} from 'entities/smartcontract';

import { Link, Table } from '../../../ui-kit';
import { toLocaleDate } from '../../../utils';
import styles from '../styles.module.scss';

type Props = { contracts: ContractDto[] | null };
export const stateIconMap = {
    [OrderState.undefined]: '',
    [OrderState.OpenOrder]: <PlusCircleOutlined style={{ color: '#2E9EFF' }} />,
    [OrderState.Terminated]: (
        <CloseCircleOutlined style={{ color: '#D32029' }} />
    ),
    [OrderState.ValidContract]: <CheckCircleOutlined />,
    [OrderState.Completed]: (
        <CheckCircleOutlined style={{ color: '#47FF40' }} />
    ),
    [OrderState.WaitingForAction]: (
        <CheckCircleOutlined style={{ color: '#F5C913' }} />
    ),
};

export const MyContractsTable: FC<Props> = ({ contracts }) => {
    const navigate = useNavigate();
    const accountName = useAccountName();
    const account = useAccountName();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                return {
                    key: contract.id,
                    id: contract.id,
                    fee: contract.fee_percent,
                    date: toLocaleDate(contract.create_time * 1000),
                    contractType: contractName[contract.type],
                    status: (
                        <Space>
                            {stateIconMap[contract.state]}{' '}
                            {stateMap[contract.state]}
                        </Space>
                    ),
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
                    dataIndex: 'nickName',
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
                                    <Link
                                        to={`/user/${nick}`}
                                        onClick={stopPropagateEvent}
                                    >
                                        {nick}
                                    </Link>
                                </Space>
                            </Space>
                        );
                    },
                },
                {
                    title: t('Contract type'),
                    dataIndex: 'contractType',
                    key: 'contractType',
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
                    sorter: (a, b) => a.const - b.cost,
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'] }}
        />
    );
};
