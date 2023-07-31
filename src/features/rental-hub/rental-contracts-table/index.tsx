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
import { changeFilterEvent } from '../../service-market';
import {
    activeRadioButton$,
    changeContractTypeRadioButtonEvent,
    RadioButtonContractTypeNames,
} from '../../service-market/role-select/model';
import { RentalContractsGate, rentContractsStore } from './model';
import style from './style.module.scss';

export const RentalContractsTable = () => {
    useGate(RentalContractsGate);
    const activeRadioButton = useStore(activeRadioButton$);
    const accountName = useAccountName();
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
        <>
            <Space>
                <Radio.Group value={activeRadioButton} className={style.radio}>
                    <Radio
                        onChange={() => {
                            changeFilterEvent({});
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
                            changeFilterEvent({
                                user: accountName,
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
                            changeFilterEvent({
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
                disabled
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
        </>
    );
};
