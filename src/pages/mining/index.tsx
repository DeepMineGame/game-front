import React, { FC, memo, useState } from 'react';
import {
    Page,
    Title,
    Plugin,
    useMediaQuery,
    desktopS,
    neutral4,
    useAccountName,
    useUserLocation,
    useReloadPage,
    gold6,
    red6,
    green6,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Alert, Col, Row, Space, Spin, Tooltip } from 'antd';
import { useGate, useStore } from 'effector-react';

import {
    getMineByAssetEffect,
    MiningAndClaimButton,
    $currentMine,
    actionsStore,
    getActionsForUserEffect,
    getContractByExecutorEffect,
    estimatesMiningTimeStore,
    ContractorCabinGate,
    $isContractorCabinLoading,
    useDisabledState,
    CallToTravelNotification,
    $lastMiningStatus,
    LastMiningStatus,
} from 'features';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    ExclamationCircleFilled,
    LoadingOutlined,
} from '@ant-design/icons';
import {
    ActionState,
    ActionType,
    LOCATION_TO_ID,
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { MiningInProgressTitle } from './components/MiningInProgressTitle';
import { MineStatus } from './components/MineStatus';
import { Equipment } from './components/Equipment';

const Icon = {
    [LastMiningStatus.success]: <CheckCircleFilled style={{ color: green6 }} />,
    [LastMiningStatus.failed]: <CloseCircleFilled style={{ color: red6 }} />,
    [LastMiningStatus.interrupted]: (
        <ExclamationCircleFilled style={{ color: gold6 }} />
    ),
};

export const MiningPage: FC = memo(() => {
    const [isMiningFinished, setIsMiningFinished] = useState(true);
    const userLocation = useUserLocation();
    const accountName = useAccountName();
    useGate(ContractorCabinGate, { searchParam: accountName });
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;
    const reloadPage = useReloadPage();
    const actions = useStore(actionsStore);
    const mineStore = useStore($currentMine);
    const estTime = useStore(estimatesMiningTimeStore);
    const lastMiningStatus = useStore($lastMiningStatus);

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

    const { disabled, ...alertProps } = useDisabledState();

    const isMiningInProgress =
        lastMineAction?.state === ActionState.active &&
        lastMineAction.finishes_at * 1000 > Date.now();

    return (
        <Page headerTitle={t('pages.mining.mining')}>
            {isMiningInProgress && (
                <MiningInProgressTitle
                    action={lastMineAction}
                    setIsMiningFinished={setIsMiningFinished}
                />
            )}
            <div className={styles.infosWrapper}>
                {lastMineAction?.state !== ActionState.active &&
                    lastMiningStatus && (
                        <Row justify="center">
                            <Col span={10}>
                                <Alert
                                    message={`${t(
                                        'pages.mining.lastMiningResult'
                                    )}: ${t(
                                        `pages.mining.${lastMiningStatus}`
                                    )}`}
                                    icon={Icon[lastMiningStatus]}
                                    showIcon
                                />
                            </Col>
                        </Row>
                    )}
                {!isContractorCabinLoading && disabled && (
                    <Row justify="center">
                        <Col span={10}>
                            <Alert {...alertProps} />
                        </Col>
                    </Row>
                )}
            </div>
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
                    <Spin
                        spinning={isMineStoreLoading && !mineStore}
                        indicator={
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                    />
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
                    <Space direction="vertical" size="large">
                        <Title level={4} fontFamily="orbitron">
                            {t('pages.mining.consumables')}
                        </Title>
                        <Space size="large" direction="vertical">
                            <Tooltip
                                placement="left"
                                color={neutral4}
                                title={t(
                                    'pages.mining.tooltipAroundConsumables'
                                )}
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
                    </Space>
                </Col>
            </Row>
            <Equipment />
            {!userLocation.mine && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.mine}
                    onSuccess={reloadPage}
                />
            )}
        </Page>
    );
});
