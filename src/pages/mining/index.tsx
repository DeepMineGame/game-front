import React, { FC, memo, useState } from 'react';
import {
    Page,
    Title,
    Plugin,
    useMediaQuery,
    desktopS,
    neutral4,
    useAccountName,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Col, Row, Skeleton, Space, Tooltip } from 'antd';
import { useGate, useStore } from 'effector-react';

import {
    getMineByAssetEffect,
    MiningAndClaimButton,
    currentMineStore,
    actionsStore,
    getActionsForUserEffect,
    getContractByExecutorEffect,
    estimatesMiningTimeStore,
    ContractorCabinGate,
    $isContractorCabinLoading,
    useDisabledState,
} from 'features';
import { ActionType } from 'entities/smartcontract';
import styles from './styles.module.scss';
import { MiningTitle } from './components/MiningTitle';
import { MineStatus } from './components/MineStatus';
import { Equipment } from './components/Equipment';

export const MiningPage: FC = memo(() => {
    const [isMiningFinished, setIsMiningFinished] = useState(true);

    const accountName = useAccountName();
    useGate(ContractorCabinGate, { searchParam: accountName });
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;

    const actions = useStore(actionsStore);
    const mineStore = useStore(currentMineStore);
    const estTime = useStore(estimatesMiningTimeStore);

    const isContractsLoading = useStore(getContractByExecutorEffect.pending);
    const isActionsLoading = useStore(getActionsForUserEffect.pending);
    const isMineStoreLoading = useStore(getMineByAssetEffect.pending);
    const isLoading = isActionsLoading || isContractsLoading;
    const isContractorCabinLoading = useStore($isContractorCabinLoading);

    const mineActions = actions?.filter(({ type }) => type === ActionType.mine);
    const lastMineAction = mineActions?.reverse()?.[0];
    const estDmeAmount =
        lastMineAction &&
        lastMineAction?.attrs?.find(({ key }) => key === 'est_dme_amount')
            ?.value;

    const { alert } = useDisabledState();

    return (
        <Page headerTitle={t('pages.mining.mining')}>
            {lastMineAction ? (
                <MiningTitle
                    action={lastMineAction}
                    setIsMiningFinished={setIsMiningFinished}
                />
            ) : (
                <Skeleton title={false} loading={isActionsLoading} />
            )}
            {!isContractorCabinLoading && (
                <Row justify="center">
                    <Col span={10}>{alert}</Col>
                </Row>
            )}
            <Row justify="center" gutter={gutter} className={styles.grid}>
                <Col sm={17} xs={24} className={styles.firsColumn}>
                    <div className={styles.wrapperForTittleWithRightSection}>
                        {!isLoading && (
                            <Title level={subTitleLevel} fontFamily="orbitron">
                                {t('pages.mining.miningStats')}
                            </Title>
                        )}
                        <MineStatus />
                    </div>
                    <Skeleton loading={isMineStoreLoading || !mineStore} />
                    <div className={styles.data}>
                        {mineStore?.length ? (
                            <div className={styles.line}>
                                <div>{t('pages.mining.mineDepth')}</div>
                                <div>{mineStore[0]?.layer_depth}</div>
                            </div>
                        ) : null}
                        {lastMineAction && estDmeAmount && (
                            <div className={styles.line}>
                                <div>{t('pages.mining.estimatesDme')}</div>
                                <div>{estDmeAmount}</div>
                            </div>
                        )}
                        {estTime && (
                            <div className={styles.line}>
                                <div>
                                    {t('pages.mining.estimatesMiningTime')}
                                </div>
                                <div>{estTime}</div>
                            </div>
                        )}
                    </div>
                </Col>
                <Col sm={7} xs={24}>
                    <Title level={4} fontFamily="orbitron">
                        {t('pages.mining.consumables')}
                    </Title>
                    <Space size="large" direction="vertical">
                        <Tooltip
                            placement="left"
                            color={neutral4}
                            title={t('pages.mining.tooltipAroundConsumables')}
                        >
                            <Space
                                direction={
                                    isDesktop ? 'horizontal' : 'vertical'
                                }
                            >
                                <Plugin />
                                <Plugin />
                            </Space>
                        </Tooltip>
                        {accountName && (
                            <MiningAndClaimButton
                                accountName={accountName}
                                action={lastMineAction}
                                isMiningWillEndInFuture={
                                    !!lastMineAction && !isMiningFinished
                                }
                            />
                        )}
                    </Space>
                </Col>
            </Row>
            <Equipment />
        </Page>
    );
});
