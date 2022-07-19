import React, { FC, useState } from 'react';
import {
    Page,
    Title,
    Plugin,
    useMediaQuery,
    desktopS,
    getTimeLeft,
    neutral4,
    useInitialStoreEnrich,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Col, Row, Skeleton, Space, Tooltip } from 'antd';
import { useStore } from 'effector-react';

import {
    actionsStore,
    getActionEffect,
    ActionType,
    getContractEffect,
    minesStore,
    getMinesEffect,
} from 'entities/smartcontract';
import styles from './styles.module.scss';
import { MiningTitle } from './components/MiningTitle';
import { MiningAndClaimButton } from './components/MiningButton';
import { MineStatus } from './components/MineStatus';
import { Equipment } from './components/Equipment';

export const MiningPage: FC = () => {
    useInitialStoreEnrich();
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;

    const actions = useStore(actionsStore);
    const mineActions = actions?.filter(({ type }) => type === ActionType.mine);
    const lastMineAction = mineActions && mineActions.reverse()?.[0];

    const isContractsLoading = useStore(getContractEffect.pending);
    const isActionsLoading = useStore(getActionEffect.pending);
    const mineStore = useStore(minesStore);
    const isMineStoreLoading = useStore(getMinesEffect.pending);
    const [isMiningFinished, setIsMiningFinished] = useState(true);

    const estMiningTime =
        lastMineAction &&
        lastMineAction?.attrs?.filter(
            ({ key }) => key === 'est_mining_time'
        )[0];

    const estDmeAmount =
        lastMineAction &&
        lastMineAction?.attrs?.filter(({ key }) => key === 'est_dme_amount')[0]
            ?.value;

    const formatEstimateMineTime =
        estMiningTime && getTimeLeft(estMiningTime.value, true);

    const isLoading = isActionsLoading || isContractsLoading;
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
                        {lastMineAction && (
                            <>
                                {formatEstimateMineTime && (
                                    <div className={styles.line}>
                                        <div>
                                            {t(
                                                'pages.mining.estimatesMiningTime'
                                            )}
                                        </div>
                                        <div>{formatEstimateMineTime}</div>
                                    </div>
                                )}
                                {estDmeAmount && (
                                    <div className={styles.line}>
                                        <div>
                                            {t('pages.mining.estimatesDme')}
                                        </div>
                                        <div>{estDmeAmount}</div>
                                    </div>
                                )}
                            </>
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
                        <MiningAndClaimButton
                            action={lastMineAction}
                            isMiningWillEndInFuture={
                                !!lastMineAction && !isMiningFinished
                            }
                        />
                    </Space>
                </Col>
            </Row>
            <Equipment />
        </Page>
    );
};
