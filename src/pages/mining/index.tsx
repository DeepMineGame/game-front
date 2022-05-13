import React, { FC } from 'react';
import {
    Page,
    Title,
    Plugin,
    Button,
    Card,
    useMediaQuery,
    desktopS,
    useChainAuthContext,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Badge, Col, Row, Space } from 'antd';
import { useSmartContractAction } from 'features';
import { startMining } from 'entities/smartcontracts';
import styles from './styles.module.scss';

export const MiningPage: FC = () => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;
    const chainAccount = useChainAuthContext();

    const startMiningCallback = useSmartContractAction<{
        wax_user: string;
        contract_id: number;
    }>(startMining(chainAccount.activeUser?.accountName || '', 2));

    return (
        <Page headerTitle={t('pages.mining.mining')}>
            <Row justify="center" gutter={gutter} className={styles.grid}>
                <Col sm={17} xs={24} className={styles.firsColumn}>
                    <div className={styles.wrapperForTittleWithRightSection}>
                        <Title level={subTitleLevel}>
                            {t('pages.mining.miningStats')}
                        </Title>
                        <Badge
                            className={styles.status}
                            status="success"
                            text={t('pages.mining.miningStatus')}
                        />
                    </div>
                    <div className={styles.data}>
                        <div className={styles.line}>
                            <div>Mine depth</div>
                            <div>2</div>
                        </div>
                        <div className={styles.line}>
                            <div>Mine depth</div>
                            <div>2</div>
                        </div>
                        <div className={styles.line}>
                            <div>Estimates mining time</div>
                            <div>1:13:10 - 2:12:40</div>
                        </div>
                        <div className={styles.line}>
                            <div>Estimates amount of DME</div>
                            <div>9999.99900000 - 9999.99999999</div>
                        </div>
                        <div className={styles.line}>
                            <div>Fossil Chance</div>
                            <div>4%</div>
                        </div>
                    </div>
                </Col>
                <Col sm={7} xs={24}>
                    <Title level={4}>{t('pages.mining.consumables')}</Title>
                    <Space size="large" direction="vertical">
                        <Space
                            direction={isDesktop ? 'horizontal' : 'vertical'}
                        >
                            <Plugin />
                            <Plugin />
                        </Space>
                        <Button
                            type="primary"
                            block
                            size={isDesktop ? 'large' : 'middle'}
                            onClick={() => startMiningCallback()}
                        >
                            {t('pages.mining.startMining')}
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row gutter={gutter}>
                <Col sm={17} xs={24}>
                    <Title level={subTitleLevel}>
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
