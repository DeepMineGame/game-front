import React, { FC, useMemo, SyntheticEvent } from 'react';
import { t } from 'i18next';
import { DiscordIcon, rarityColorMap, useAccountName } from 'shared';
import { Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import { ContractDto, normalizeAttrs } from 'entities/smartcontract';

import { Link, Table } from '../../../ui-kit';
import { toLocaleDate } from '../../../utils';
import styles from '../styles.module.scss';

type Props = { contracts: ContractDto[] | null };

export const MineOwnerLandlordTable: FC<Props> = ({ contracts }) => {
    const navigate = useNavigate();
    const account = useAccountName();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                return {
                    deposit: contract.deposit,
                    level: contract.level,
                    subLevel: normalizeAttrs(contract.attrs).mine_sublevel,
                    nickName: contract.client,
                    key: contract.id,
                    id: contract.id,
                    fee: contract.fee_percent,
                    date: toLocaleDate(contract.create_time * 1000),
                    rarity: contract.computed?.land_rarity,
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
                    title: t('Landlord'),
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
                    ) =>
                        rarity ? (
                            <div
                                className={styles.rarityMarker}
                                style={{ background: rarityColorMap[rarity] }}
                            />
                        ) : (
                            t('N/A')
                        ),
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
                {
                    title: t('Min mine level'),
                    dataIndex: 'level',
                    key: 'level',
                    sorter: (a, b) => a.const - b.cost,
                    render: (value) => (value === -1 ? t('Any') : value),
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'] }}
        />
    );
};
