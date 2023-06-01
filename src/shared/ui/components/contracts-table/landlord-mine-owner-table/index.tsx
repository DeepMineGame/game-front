import React, { FC, useMemo, SyntheticEvent } from 'react';
import { t } from 'i18next';
import { DiscordIcon, rarityColorMapByEnum, useAccountName } from 'shared';
import { Progress, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import { ContractDto, normalizeAttrs } from 'entities/smartcontract';

import { Link, Table, Tag } from '../../../ui-kit';
import { toLocaleDate } from '../../../utils';
import styles from '../styles.module.scss';

type Props = { contracts: ContractDto[] | null };

const SUB_LEVELS_MAX_AMOUNT = 5;

export const LandlordMineOwnerTable: FC<Props> = ({ contracts }) => {
    const navigate = useNavigate();
    const account = useAccountName();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                return {
                    deposit: contract.deposit,
                    level: contract.computed?.mine_level,
                    subLevel: normalizeAttrs(contract.attrs).mine_sublevel,
                    nickName: contract.client,
                    key: contract.id,
                    id: contract.id,
                    fee: contract.fee_percent,
                    date: toLocaleDate(contract.create_time * 1000),
                    rarity: contract.rarity,
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
                    title: t('Mine owner'),
                    dataIndex: 'nickName',
                    key: 'nickName',
                    render: (value, { contract }) => {
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
                {
                    title: 'Rarity',
                    dataIndex: 'rarity',
                    key: 'rarity',
                    render: (rarity: -1 | 1 | 2 | 3 | 4 | 5) =>
                        rarity === -1 ? (
                            'N/A'
                        ) : (
                            <div
                                className={styles.rarityMarker}
                                style={{
                                    background: rarityColorMapByEnum[rarity],
                                }}
                            />
                        ),
                },
                {
                    title: 'Mine level',
                    dataIndex: 'level',
                    key: 'level',
                    render: (level) => (level === -1 ? 'N/A' : level),
                },
                {
                    title: 'Sublevel',
                    dataIndex: 'subLevel',
                    key: 'subLevel',
                    render: (subLevel) => {
                        const mineSubLevelToPercent =
                            subLevel > 0 &&
                            ((subLevel + 1) / SUB_LEVELS_MAX_AMOUNT) * 100;
                        return (
                            <Progress
                                percent={mineSubLevelToPercent || 25}
                                steps={5}
                                showInfo={false}
                            />
                        );
                    },
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
