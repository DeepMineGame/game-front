import React, { FC, memo, useState } from 'react';
import {
    Page,
    Title,
    Plugin,
    useMediaQuery,
    desktopS,
    useAccountName,
    useUserLocation,
    useReloadPage,
    gold6,
    red6,
    green6,
    getTimeLeft,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Alert, Col, Row, Space, Spin, Tooltip } from 'antd';
import { useGate, useStore } from 'effector-react';

import {
    getMineByAssetEffect,
    MiningAndClaimButton,
    ContractorCabinGate,
    $isContractorCabinLoading,
    useDisabledState,
    CallToTravelNotification,
    $lastMiningStatus,
    LastMiningStatus,
    $miningStat,
    MiningStatGate,
} from 'features';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    ExclamationCircleFilled,
    LoadingOutlined,
} from '@ant-design/icons';
import { LOCATION_TO_ID } from 'entities/smartcontract';
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
    const accountName = useAccountName();

    useGate(MiningStatGate, { accountName });
    useGate(ContractorCabinGate, { searchParam: accountName });

    const [isMiningTimerEnd, setIsMiningTimerEnd] = useState(true);
    const userLocation = useUserLocation();
    const miningStat = useStore($miningStat);
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;
    const reloadPage = useReloadPage();
    const lastMiningStatus = useStore($lastMiningStatus);

    const isMineStoreLoading = useStore(getMineByAssetEffect.pending);
    const isContractorCabinLoading = useStore($isContractorCabinLoading);

    const { disabled, ...alertProps } = useDisabledState();
    return (
        <Page headerTitle={t('pages.mining.mining')}>
            {Boolean(miningStat?.mining_seconds_left) && (
                <MiningInProgressTitle
                    setIsMiningFinished={setIsMiningTimerEnd}
                />
            )}
            <div className={styles.infosWrapper}>
                {miningStat?.action_state === 'active' && lastMiningStatus && (
                    <Row justify="center">
                        <Col span={10}>
                            <Alert
                                message={`${t(
                                    'pages.mining.lastMiningResult'
                                )}: ${t(`pages.mining.${lastMiningStatus}`)}`}
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
                        <Title level={subTitleLevel} fontFamily="orbitron">
                            {t('pages.mining.miningStats')}
                        </Title>
                        <MineStatus />
                    </div>
                    <Spin
                        spinning={isMineStoreLoading}
                        indicator={
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                    />
                    <div className={styles.data}>
                        {miningStat ? (
                            <div className={styles.line}>
                                <div>{t('pages.mining.mineDepth')}</div>
                                <div>{miningStat?.mine_depth}</div>
                            </div>
                        ) : null}
                        {miningStat && (
                            <div className={styles.line}>
                                <div>{t('Estimates amount of DME')}</div>
                                <div>{`${Number(
                                    miningStat.est_mining_power_min / 10 ** 8
                                ).toFixed(2)}/${Number(
                                    miningStat.est_mining_power_max / 10 ** 8
                                ).toFixed(2)}`}</div>
                            </div>
                        )}
                        {miningStat && (
                            <div className={styles.line}>
                                <div>{t('Estimated mining time')}</div>
                                <div>{`${getTimeLeft(
                                    miningStat.est_time_min
                                )} - ${getTimeLeft(
                                    miningStat.est_time_max
                                )}`}</div>
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
                            <MiningAndClaimButton
                                accountName={accountName}
                                isMiningWillEndInFuture={!isMiningTimerEnd}
                            />
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
