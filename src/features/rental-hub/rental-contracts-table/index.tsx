import React, { SyntheticEvent, useMemo } from 'react';
import { t } from 'i18next';
import {
    DiscordIcon,
    Link,
    useAccountName,
    useSearchByNickNameTableProps,
    rarityColumnWithSorterProps,
} from 'shared';
import { Button, Radio, Space, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { useGate, useStore } from 'effector-react';

import { createRentOrder } from 'app/router/paths';
import {
    activeRadioButton$,
    changeContractTypeRadioButtonEvent,
    RadioButtonContractTypeNames,
} from '../../service-market/role-select/model';
import {
    changeRentalFilterEvent,
    RentalContractsGate,
    rentContractsStore,
} from './model';
import style from './style.module.scss';

export const RentalContractsTable = () => {
    const activeRadioButton = useStore(activeRadioButton$);
    const accountName = useAccountName();
    useGate(RentalContractsGate, { user: accountName });

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
                    rarity: contract.assets?.[0].rarity,
                    level: contract.assets?.[0].level,
                    itemType:
                        Number(contract?.assets?.length) > 1
                            ? 'Equipment set'
                            : contract?.assets?.[0].type.replaceAll('_', ' '),
                    daysLeft: contract.days_left || 'N/A',
                    status: String(contract.status).replaceAll('_', ' '),
                    contract,
                };
            }),
        [account, contracts]
    );

    const stopPropagateEvent = (event: SyntheticEvent<any>) =>
        event.stopPropagation();

    return (
        <>
            <Space>
                <Radio.Group value={activeRadioButton} className={style.radio}>
                    <Radio
                        onChange={() => {
                            changeRentalFilterEvent({
                                user: accountName,
                            });
                            changeContractTypeRadioButtonEvent(
                                RadioButtonContractTypeNames['All contracts']
                            );
                        }}
                        value={RadioButtonContractTypeNames['All contracts']}
                    >
                        {t('All contracts')}
                    </Radio>
                    <Radio
                        onChange={() => {
                            changeRentalFilterEvent({
                                user: accountName,
                                my_contracts: true,
                            });
                            changeContractTypeRadioButtonEvent(
                                RadioButtonContractTypeNames['My contracts']
                            );
                        }}
                        value={RadioButtonContractTypeNames['My contracts']}
                    >
                        {t('My contracts')}
                    </Radio>
                    <Radio
                        value={
                            RadioButtonContractTypeNames['Contract offerings']
                        }
                        onChange={() => {
                            changeRentalFilterEvent({
                                user: accountName,
                                offers: true,
                            });
                            changeContractTypeRadioButtonEvent(
                                RadioButtonContractTypeNames[
                                    'Contract offerings'
                                ]
                            );
                        }}
                    >
                        {t('Contract offerings')}
                    </Radio>
                </Radio.Group>
            </Space>
            <Button
                type="primary"
                onClick={() => navigate(createRentOrder)}
                icon={<PlusOutlined />}
                className={style.createOrderButton}
            >
                {t('Create order')}
            </Button>
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
                                                        {
                                                            contract.client_discord
                                                        }{' '}
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
                    {
                        title: t('Item type'),
                        dataIndex: 'itemType',
                        key: 'itemType',
                    },
                    rarityColumnWithSorterProps,
                    {
                        title: t('Item level'),
                        dataIndex: 'level',
                        key: 'level',
                    },
                    {
                        title: t('Days left'),
                        dataIndex: 'daysLeft',
                        key: 'daysLeft',
                    },
                    {
                        title: t('Status'),
                        dataIndex: 'status',
                        key: 'status',
                    },
                ]}
                dataSource={dataSource}
                pagination={{ position: ['bottomCenter'] }}
            />
        </>
    );
};
