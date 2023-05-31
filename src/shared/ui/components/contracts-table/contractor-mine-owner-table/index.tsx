import React, { FC, useMemo, SyntheticEvent } from 'react';
import { t } from 'i18next';
import { DiscordIcon, useAccountName } from 'shared';
import { Progress, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import {
    ContractDto,
    contractName,
    normalizeAttrs,
    stateMap,
} from 'entities/smartcontract';

import { Link, Table, Tag } from '../../../ui-kit';
import { toLocaleDate } from '../../../utils';
import styles from '../styles.module.scss';

type Props = { contracts: ContractDto[] | null };

const rarityColorMap = {
    Common: '#DBDBDB', // neutral9
    Uncommon: '#09E001', // green4
    Rare: '#0089FF', // geekblue5
    Epic: '#CB2EFF', // purple6
    Legendary: '#E8D639', // yellow7,
};
const SUB_LEVELS_MAX_AMOUNT = 5;

export const ContractorMineOwnerTable: FC<Props> = ({ contracts }) => {
    const navigate = useNavigate();
    const account = useAccountName();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                return {
                    deposit: contract.deposit,
                    level: contract.computed?.mine_level,
                    subLevel: normalizeAttrs(contract.attrs).mine_sublevel,
                    nickName: contract.client || contract.executor,
                    key: contract.id,
                    id: contract.id,
                    fee: contract.fee_percent,
                    date: toLocaleDate(contract.create_time * 1000),
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
                                        to={`/user/${contract.client}`}
                                        onClick={stopPropagateEvent}
                                    >
                                        {contract.client}
                                    </Link>
                                </Space>
                            </Space>
                        );
                    },
                },
                {
                    title: 'Area rarity',
                    dataIndex: 'rarity',
                    key: 'rarity',
                    render: (
                        rarity:
                            | 'Common'
                            | 'Uncommon'
                            | 'Rare'
                            | 'Epic'
                            | 'Legendary'
                    ) => (
                        <div
                            className={styles.rarityMarker}
                            style={{ background: rarityColorMap[rarity] }}
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
                    title: t('fee'),
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
