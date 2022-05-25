import React from 'react';
import { Card, desktopS, Title, useMediaQuery } from 'shared';
import { useStore } from 'effector-react';
import { getImagePath, TEST_NET_ASSETS_ID_MAP } from 'features';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { inventoriesStore } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const Equipment = () => {
    const inventories = useStore(inventoriesStore);
    const installedItems = inventories?.filter(({ activated }) => activated);
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;
    const { t } = useTranslation();

    return (
        <>
            <Row gutter={gutter}>
                <Col sm={17} xs={24}>
                    <Title fontFamily="orbitron" level={subTitleLevel}>
                        {t('pages.mining.myEquipment')}
                    </Title>
                </Col>
                {/* <Col sm={7} xs={24}> */}
                {/*    <Button type="link">{t('pages.mining.configure')}</Button> */}
                {/* </Col> */}
            </Row>
            <div className={styles.cards}>
                {installedItems?.map(({ asset_template_id }) => (
                    <Card
                        key={asset_template_id}
                        imageSrc={getImagePath(
                            asset_template_id as keyof typeof TEST_NET_ASSETS_ID_MAP
                        )}
                        status="installed"
                    />
                ))}
            </div>
        </>
    );
};
