import React, { SyntheticEvent, useMemo } from 'react';
import { t } from 'i18next';
import {
    DiscordIcon,
    Link,
    useAccountName,
    useSearchByNickNameTableProps,
    rarityColumnWithSorterProps,
} from 'shared';
import { Space, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined } from '@ant-design/icons';
import { useGate, useStore } from 'effector-react';

import { RentalContractsGate, rentContractsStore } from './model';

export const RentalContractsTable = () => {
    useGate(RentalContractsGate);
    const contracts = useStore(rentContractsStore);
    const navigate = useNavigate();
    const account = useAccountName();
    const nicknameSearchProps = useSearchByNickNameTableProps();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                return {
                    owner: contract.owner,
                    key: contract.id,
                    id: contract.id,
                    rarity: contract.rarity,
                    level: contract.level,
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
                    navigate(`/rental-hub/contract/${record.id}`);
                },
            })}
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
                    title: t('Owner'),
                    dataIndex: 'owner',
                    width: 300,
                    key: 'owner',
                    ...nicknameSearchProps,
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
                                        to={`/user/${contract.owner}`}
                                        onClick={stopPropagateEvent}
                                    >
                                        {contract.owner}
                                    </Link>
                                </Space>
                            </Space>
                        );
                    },
                },
                rarityColumnWithSorterProps,
                {
                    title: t('Level'),
                    dataIndex: 'level',
                    key: 'level',
                },
            ]}
            dataSource={dataSource}
            pagination={{ position: ['bottomCenter'] }}
        />
    );
};
