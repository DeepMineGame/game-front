import React, { FC, useMemo, SyntheticEvent } from 'react';
import { t } from 'i18next';
import {
    DiscordIcon,
    rarityColorMapByEnum,
    useAccountName,
    useSearchByNickNameTableProps,
} from 'shared';
import { Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import { ContractDto } from 'entities/smartcontract';

import { Link, Table } from '../../../ui-kit';
import { toLocaleDate } from '../../../utils';
import styles from '../styles.module.scss';
import { rarityColumnWithSorterProps } from '../lib/rarity-column-with-sorter-props';

type Props = { contracts: ContractDto[] | null };

export const MineOwnerEngineerTable: FC<Props> = ({ contracts }) => {
    const nicknameSearchProps = useSearchByNickNameTableProps();
    const navigate = useNavigate();
    const account = useAccountName();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                return {
                    deposit: contract.deposit,
                    level: contract.level,
                    key: contract.id,
                    id: contract.id,
                    cost_of_execution: contract.cost_of_execution,
                    date: toLocaleDate(contract.create_time * 1000),
                    rarity: contract.rarity,
                    coast: contract,
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
                    title: t('Engineer'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                    ...nicknameSearchProps,
                    render: (_, { contract }) => {
                        return (
                            <Space align="start" size="large">
                                {contract.executor_discord && (
                                    <Tooltip
                                        overlay={
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(
                                                        contract.executor_discord
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
                                                    {contract.executor_discord}{' '}
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
                                        to={`/user/${contract.executor}`}
                                        onClick={stopPropagateEvent}
                                    >
                                        {contract.executor}
                                    </Link>
                                </Space>
                            </Space>
                        );
                    },
                },
                rarityColumnWithSorterProps,
                {
                    title: t('Level upgrade'),
                    dataIndex: 'level',
                    key: 'level',
                    render: (level) =>
                        level === -1 ? 'N/A' : `${level - 1} → ${level}`,
                },
                {
                    title: t('Creation date'),
                    dataIndex: 'date',
                    key: 'date',
                    sorter: (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                },
                {
                    title: t('Cost, DME'),
                    dataIndex: 'cost_of_execution',
                    key: 'cost_of_execution',
                    sorter: (a, b) => a.fee - b.fee,
                    render: (val) => val / 10 ** 8,
                },
                {
                    title: t('Minimum fee, DME'),
                    dataIndex: 'deposit',
                    key: 'deposit',
                    sorter: (a, b) => a.const - b.cost,
                    render: (val) => val / 10 ** 8,
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'] }}
        />
    );
};
