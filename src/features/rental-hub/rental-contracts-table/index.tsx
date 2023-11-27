import React, { SyntheticEvent, useMemo } from 'react';
import { t } from 'i18next';
import {
    DiscordIcon,
    Link,
    rarityColumnWithSorterProps,
    secondsToDays,
    useAccountName,
    useSearchByNickNameTableProps,
} from 'shared';
import { Button, Radio, Space, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { useGate, useStore } from 'effector-react';

import { createRentOrder } from 'app/router/paths';
import { ColumnsType } from 'antd/lib/table';
import {
    refrentcontr,
    RentalContractStatuses,
    signrcontr,
} from 'entities/smartcontract';
import {
    activeRadioButton$,
    changeContractTypeRadioButtonEvent,
    RadioButtonContractTypeNames,
} from '../../service-market/role-select/model';
import { useSmartContractActionDynamic } from '../../hooks';
import {
    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME,
    setSomethingCountDownEvent,
} from '../../something-in-progess-modal';
import {
    changeRentalFilterEvent,
    filterStore,
    RentalContractsGate,
    rentContractsStore,
} from './model';
import style from './style.module.scss';

export const RentalContractsTable = () => {
    const activeRadioButton = useStore(activeRadioButton$);
    const accountName = useAccountName();
    const filters = useStore(filterStore);

    useGate(RentalContractsGate, { user: accountName, ...filters });
    const contracts = useStore(rentContractsStore);
    const callAction = useSmartContractActionDynamic();

    const navigate = useNavigate();
    const account = useAccountName();
    const nicknameSearchProps = useSearchByNickNameTableProps();
    const dataSource = useMemo(
        () =>
            contracts?.map((contract) => {
                const daysLeft =
                    contract.status ===
                        RentalContractStatuses.SIGNED_BY_OWNER ||
                    contract.status === RentalContractStatuses.SIGNED_BY_RENTER
                        ? secondsToDays(contract.contract_duration)
                        : contract.days_left;
                return {
                    owner: contract.owner,
                    key: contract.id,
                    id: contract.id,
                    rarity: contract.assets?.[0].rarity,
                    level: contract.assets?.[0].level,
                    itemType: contract?.assets_type?.replaceAll('_', ' '),
                    daysLeft: daysLeft ? Math.ceil(daysLeft) : 'N/A',
                    status: String(contract.status)
                        .replaceAll('_', ' ')
                        .toLowerCase(),
                    contract,
                };
            }),
        [account, contracts]
    );

    const stopPropagateEvent = (event: SyntheticEvent<any>) =>
        event.stopPropagation();

    const columns: ColumnsType<any> = [
        {
            title: t('Contract ID'),
            dataIndex: 'id',
            key: 'id',
            render: (value, props) => (
                <Link to={`/rental-hub/contract/${props.key}`}>{value}</Link>
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
                                            overlay={t('pages.info.copied')}
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
            title:
                activeRadioButton ===
                RadioButtonContractTypeNames['All contracts']
                    ? t('Duration')
                    : t('Days left'),
            dataIndex: 'daysLeft',
            key: 'daysLeft',
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            key: 'status',
        },
    ];
    if (activeRadioButton === RadioButtonContractTypeNames['Contract offers']) {
        columns.push({
            title: 'Action',
            render: (_, { id }) => (
                <>
                    <Button
                        type="link"
                        onClick={async () => {
                            await callAction(
                                refrentcontr({
                                    waxUser: accountName,
                                    contractId: Number(id),
                                })
                            );
                            setSomethingCountDownEvent(
                                DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME
                            );
                        }}
                    >
                        {t('Decline')}
                    </Button>
                    <Button
                        type="link"
                        onClick={async () => {
                            await callAction(
                                signrcontr({
                                    waxUser: accountName,
                                    contractId: Number(id),
                                })
                            );
                            setSomethingCountDownEvent(
                                DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME
                            );
                        }}
                    >
                        {t('Accept')}
                    </Button>
                </>
            ),
        });
    }
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
                        {t('Rent offers')}
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
                        value={RadioButtonContractTypeNames['Contract offers']}
                        onChange={() => {
                            changeRentalFilterEvent({
                                user: accountName,
                                offers: true,
                            });
                            changeContractTypeRadioButtonEvent(
                                RadioButtonContractTypeNames['Contract offers']
                            );
                        }}
                    >
                        {t('Contract offers')}
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
                columns={columns}
                dataSource={dataSource}
                pagination={{ position: ['bottomCenter'] }}
            />
        </>
    );
};
