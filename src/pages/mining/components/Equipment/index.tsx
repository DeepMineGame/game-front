import { Card2, CardHolder, desktopS, Title, useMediaQuery } from 'shared';
import { useStore } from 'effector-react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { $miningStat } from 'features';
import { useNavigate } from 'react-router-dom';
import { equipmentSet } from 'app/router/paths';
import styles from './styles.module.scss';

export const Equipment = () => {
    const miningStat = useStore($miningStat);

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
                        {t('My equipment').toUpperCase()}
                    </Title>
                </Col>
            </Row>
            <div className={styles.cards}>
                {miningStat?.assets?.map((inventoryItem) =>
                    inventoryItem ? (
                        <Card2
                            key={inventoryItem.asset_id}
                            inventory={inventoryItem}
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
