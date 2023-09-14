import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
    App,
    Button,
    Col,
    Row,
    Skeleton,
    Space,
    Statistic,
    Table,
    Typography,
} from 'antd';
import {
    SearchingItem,
    toLocaleDate,
    useAccountName,
    useReloadPage,
} from 'shared';
import { useGate, useStore } from 'effector-react';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import { Roles } from 'entities/game-stat';
import { signOrder } from 'entities/smartcontract';
import { $mineCrew, getMineCrewEffect, MineCrewGate } from '../model/crew';
import { useSmartContractAction } from '../../../hooks';
import styles from './styles.module.scss';
import { OccupiedTable } from './OccupiedTable';
import PlaceAsContractor from './PlaceAsContractor';

export const MineOwnerCrew: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const navigate = useNavigate();
    const { modal } = App.useApp();
    const reloadPage = useReloadPage();

    useGate(MineCrewGate, { mineOwner: accountName });
    const mineCrew = useStore($mineCrew);
    const isPlaceMySelfButtonDisabled = mineCrew?.in_progress?.find(
        ({ self_sign_available }) => self_sign_available
    );
    const isMineCrewLoading = useStore(getMineCrewEffect.pending);
    const signContractAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            contractId:
                mineCrew?.in_progress?.find(
                    ({ self_sign_available }) => self_sign_available
                )?.contract_id || 0,
            isClient: 0,
        }),
    });

    const handleSignOrder = useCallback(async () => {
        await signContractAction();
        modal.success({
            title: t('pages.serviceMarket.order.signOrder'),
            content: t('pages.serviceMarket.order.orderCreated'),
            onOk: reloadPage,
        });
    }, [modal, reloadPage, signContractAction, t]);

    if (isMineCrewLoading) {
        return <Skeleton />;
    }

    return (
        <>
            <Row justify="center">
                <Col span={2}>
                    <Statistic
                        title={t('Total slots')}
                        value={mineCrew?.counters.total}
                    />
                </Col>
                <Col span={2}>
                    <Statistic
                        title={t('Locked slots')}
                        value={mineCrew?.counters.locked}
                    />
                </Col>
                <Col span={2}>
                    <Statistic
                        title={t('Available slots')}
                        value={mineCrew?.counters.available}
                    />
                </Col>
                <Col span={2}>
                    <Statistic
                        title={t('In progress')}
                        value={mineCrew?.counters.in_progress}
                    />
                </Col>
                <Col span={2}>
                    <Statistic
                        title={t('Occupied')}
                        value={mineCrew?.counters.occupied}
                    />
                </Col>
            </Row>
            <div className={styles.buttonWrapper}>
                <Space align="center" size="large">
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() =>
                            navigate(
                                `${serviceMarket}?user_role=${Roles.mineowner}&search_role=${Roles.contractor}`
                            )
                        }
                    >
                        {t('Add new Contractor')}
                    </Button>
                    <PlaceAsContractor
                        accountName={accountName}
                        isDisabled={Boolean(isPlaceMySelfButtonDisabled)}
                    />
                </Space>
            </div>
            {Boolean(mineCrew?.in_progress?.length) && (
                <Typography.Paragraph>{t('In progress')}</Typography.Paragraph>
            )}
            {mineCrew?.in_progress?.map(
                ({ contract_id, create_time, self_sign_available }, index) => {
                    return (
                        <SearchingItem
                            accountName={accountName}
                            contract={{ id: contract_id }}
                            text={t('Searching for Contractor')}
                            subText={
                                self_sign_available && index === 0
                                    ? t(
                                          'Sign as a contractor to start working in your mine'
                                      )
                                    : toLocaleDate(create_time)
                            }
                            actionButton={
                                self_sign_available && index === 0 ? (
                                    <Button
                                        onClick={handleSignOrder}
                                        type="primary"
                                        size="small"
                                    >
                                        {t('Sign the order')}
                                    </Button>
                                ) : undefined
                            }
                        />
                    );
                }
            )}

            {mineCrew && (
                <div className={styles.occupiedTable}>
                    <Typography.Paragraph>{t('Occupied')}</Typography.Paragraph>

                    <OccupiedTable mineCrew={mineCrew} />
                </div>
            )}
        </>
    );
};
