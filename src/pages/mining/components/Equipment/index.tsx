import { Card, CardHolder, desktopS, Title, useMediaQuery } from 'shared';
import { useStore } from 'effector-react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { findEquipmentByName } from 'features';
import { useNavigate } from 'react-router-dom';
import { equipmentSet } from 'app/router/paths';
import {
    miningEquipmentNames,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    $mergedInventoryWithAtomicAssets,
    AssetDataType,
} from 'entities/atomicassets';
import styles from './styles.module.scss';

export const Equipment = () => {
    const inventoriedAssets = useStore($mergedInventoryWithAtomicAssets);
    const installedItems = inventoriedAssets?.filter(({ in_use }) => in_use);
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
            </Row>
            <div className={styles.cards}>
                {Object.values(installedMiningEquipment).map((inventoryItem) =>
                    inventoryItem ? (
                        <Card
                            key={inventoryItem.asset_id}
                            inventory={
                                inventoryItem as UserInventoryType &
                                    AssetDataType
                            }
                            onClick={() =>
                                navigate(`/inventory/${inventoryItem.asset_id}`)
                            }
                            showCardBadgeStatus
                        />
                    ) : (
                        <CardHolder onClick={() => navigate(equipmentSet)} />
                    )
                )}
            </div>
        </>
    );
};
