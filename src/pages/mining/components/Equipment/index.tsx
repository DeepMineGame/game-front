import React from 'react';
import { Card, desktopS, Title, useMediaQuery } from 'shared';
import { useStore } from 'effector-react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { findEquipmentByName } from 'features';
import { useNavigate } from 'react-router-dom';
import { inventoriesStore, miningEquipmentNames } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const Equipment = () => {
    const inventories = useStore(inventoriesStore);
    const installedItems = inventories?.filter(({ in_use }) => in_use);
    const installedMiningEquipment = Object.fromEntries(
        miningEquipmentNames.map((name) => [
            name,
            findEquipmentByName(installedItems || [], name),
        ])
    );
    const isDesktop = useMediaQuery(desktopS);
    const subTitleLevel = isDesktop ? 3 : 4;
    const gutter = isDesktop ? 80 : 16;
    const { t } = useTranslation();
    const navigate = useNavigate();

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
                {Object.values(installedMiningEquipment).map(
                    (inventoryItem) =>
                        inventoryItem && (
                            <Card
                                key={inventoryItem.template_id}
                                templateId={inventoryItem.template_id}
                                status="installed"
                                onClick={() =>
                                    navigate(
                                        `/inventory/${inventoryItem.asset_id}`
                                    )
                                }
                            />
                        )
                )}
            </div>
        </>
    );
};
