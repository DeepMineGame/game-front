import React, { FC } from 'react';
import {
    Page,
    Title,
    Plugin,
    Button,
    Card,
    useMediaQuery,
    desktopS,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Col, Row, Skeleton, Space, Tooltip } from 'antd';
import { useStore } from 'effector-react';
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
    actionsStore,
    getActionEffect,
    ActionType,
    getContractEffect,
    minesStore,
    getMinesEffect,
} from 'entities/smartcontracts';
import styles from './styles.module.scss';
import { MiningTitle } from './components/MiningTitle';
import { MiningAndClaimButton } from './components/MiningButton';
import { MineStatus } from './components/MineStatus';
import { useInitialStoreEnrich } from './hooks/useInitialStoreEnrich';

dayjs.extend(duration);
const SECOND = 1000;

export const MiningPage: FC = () => {
    useInitialStoreEnrich();
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;

    const actions = useStore(actionsStore);
    const isContractsLoading = useStore(getContractEffect.pending);
    const isActionsLoading = useStore(getActionEffect.pending);
    const mineActions = actions?.filter(({ type }) => type === ActionType.mine);
    const mineStore = useStore(minesStore);
    const isMineStoreLoading = useStore(getMinesEffect.pending);
    const action = mineActions && mineActions[0];
    const neutral4 = '#303030';
    const estMiningTime =
        action &&
        action.processes.filter(({ key }) => key === 'est_mining_time')[0];

    const estDmeAmount =
        action &&
        action.processes.filter(({ key }) => key === 'est_dme_amount')[0]
            ?.value;

    const formatEstimateMineTime =
        estMiningTime &&
        dayjs
            .duration((estMiningTime.value as unknown as number) * SECOND)
            .format('HH:mm:ss');
    const isLoading = isActionsLoading || isContractsLoading;
    return (
        <Page headerTitle={t('pages.mining.mining')}>
            {action ? (
                <MiningTitle action={action} />
            ) : (
                <Skeleton title={false} loading={isLoading} />
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
                        {mineStore && (
                            <div className={styles.line}>
                                <div>Mine depth</div>
                                <div>{mineStore[0].layer_depth}</div>
                            </div>
                        )}
                        {action && (
                            <>
                                {formatEstimateMineTime && (
                                    <div className={styles.line}>
                                        <div>Estimates mining time</div>
                                        <div>{formatEstimateMineTime}</div>
                                    </div>
                                )}
                                {estDmeAmount && (
                                    <div className={styles.line}>
                                        <div>Estimates amount of DME</div>
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
                            title="This is where improvements are installed that allow you to make mining more efficient. They will be available for the Mine level 1"
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
                        <MiningAndClaimButton action={action} />
                    </Space>
                </Col>
            </Row>
            <Row gutter={gutter}>
                <Col sm={17} xs={24}>
                    <Title fontFamily="orbitron" level={subTitleLevel}>
                        {t('pages.mining.myEquipment')}
                    </Title>
                </Col>
                <Col sm={7} xs={24}>
                    <Button type="link">{t('pages.mining.configure')}</Button>
                </Col>
            </Row>
            <div className={styles.cards}>
                <Card
                    initial={10}
                    remained={10}
                    current={8}
                    status="installed"
                />
                <Card initial={100} remained={10} current={2} status="broken" />
                <Card
                    initial={100}
                    remained={50}
                    current={5}
                    status="notInstalled"
                />
                <Card initial={3} remained={2} current={1} />
            </div>
        </Page>
    );
};
