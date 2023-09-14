import React, { FC } from 'react';
import { Badge, Modal as ModalAnt, Space, Switch, Table } from 'antd';
import { Link, useAccountName, useReloadPage } from 'shared';
import { useTranslation } from 'react-i18next';
import { serviceMarket } from 'app/router/paths';
import { MineCrewDto } from 'entities/game-stat';
import { disautorenew, MineState } from 'entities/smartcontract';
import { useSmartContractActionDynamic } from '../../../../hooks';

export const OccupiedTable: FC<{ mineCrew: MineCrewDto }> = ({ mineCrew }) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const reloadPage = useReloadPage();
    const callAction = useSmartContractActionDynamic();
    const autoRenewOff = (contractId: number) => async () => {
        await callAction(
            disautorenew({
                waxUser: accountName,
                contractId,
            })
        );
        ModalAnt.success({
            title: t('Auto-renewal'),
            content: t('Auto-renewal disabled'),
            onOk: reloadPage,
        });
    };
    return (
        <Table
            pagination={false}
            dataSource={mineCrew.occupied}
            columns={[
                {
                    title: t('Contract ID'),

                    dataIndex: 'contract_id',
                    key: 'contract',
                    render: (contractId: string) => {
                        return (
                            <Link
                                to={`/${serviceMarket}/contract/${contractId}`}
                            >
                                {contractId}
                            </Link>
                        );
                    },
                },
                {
                    title: t('Contractor'),

                    dataIndex: 'contractor',
                    key: 'contractor',
                    render: (contractor) => {
                        return (
                            <Link to={`/user/${contractor}`}>{contractor}</Link>
                        );
                    },
                },
                {
                    title: t('Status'),
                    dataIndex: 'status',
                    key: 'status',

                    render: (status: MineState) => (
                        <Space>
                            <Badge color={status ? '#D87A16' : '#47FF40'} />
                            {status ? t(`Mining`) : t('Ready to mine')}
                        </Space>
                    ),
                },
                {
                    title: t('Paid fee'),
                    dataIndex: 'paid_fee',
                    key: 'paid_fee',
                    render: (amount) => Number(amount)?.toFixed(2),
                },
                {
                    title: t('Auto-renewal'),
                    dataIndex: 'autorenewal_enabled',
                    key: 'autorenewal_enabled',
                    render: (autoRenewFlag, { contract_id }) => {
                        return (
                            <Switch
                                onClick={autoRenewOff(contract_id)}
                                checked={autoRenewFlag}
                            />
                        );
                    },
                },
            ]}
        />
    );
};
