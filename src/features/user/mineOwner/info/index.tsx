import React, { FC } from 'react';
import { Col, Empty, Row } from 'antd';
import { Button, KeyValueTable, Title } from 'shared';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { minesStore, rarityMap } from 'entities/smartcontract';
import { areaForMineStore, areaOwnerStore } from './model';
import styles from './styles.module.scss';

export const MineOwnerInfo: FC = () => {
    const mines = useStore(minesStore);
    const area = useStore(areaForMineStore);
    const areaNft = useStore(areaOwnerStore);
    const mine = mines?.[0];
    const { t } = useTranslation();

    return (
        <Row gutter={16} className={styles.wrapper}>
            <Col span={12}>
                <Title level={5} fontFamily="orbitron" className={styles.title}>
                    {t('components.common.mineInfo').toUpperCase()}
                </Title>
                {mine ? (
                    <KeyValueTable
                        items={{
                            Mine: <Button type="link">ID {mine.id}</Button>,
                            Level: mine.level,
                            SubLevel: mine.sub_level,
                            Depth: mine.layer_depth,
                        }}
                    />
                ) : (
                    <Empty />
                )}
            </Col>

            <Col span={12}>
                <Title level={5} fontFamily="orbitron" className={styles.title}>
                    {t('components.common.areaInfo').toUpperCase()}
                </Title>
                {area ? (
                    <KeyValueTable
                        items={{
                            Area: <Button type="link">ID {area.id}</Button>,
                            Landlord: areaNft?.owner || '',
                            'Area Rarity': areaNft && rarityMap[areaNft.rarity],
                            'Mines on Area': area.mine_slots.length,
                            'Area fee': '-',
                        }}
                    />
                ) : (
                    <Empty />
                )}
            </Col>
        </Row>
    );
};
