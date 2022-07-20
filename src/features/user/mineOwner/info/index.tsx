import React, { FC } from 'react';
import { Col, Empty, Row, Skeleton } from 'antd';
import { Area, Button, KeyValueTable, Title } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { rarityMap } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import {
    areaForMineStore,
    areaNftStore,
    getAreasEffect,
    getMinesEffect,
    MineOwnerInfoGate,
    minesStore,
} from './model';

export const MineOwnerInfo: FC<{ accountName: string }> = ({ accountName }) => {
    useGate(MineOwnerInfoGate, { searchParam: accountName });
    const { t } = useTranslation();
    const mines = useStore(minesStore);
    const area = useStore(areaForMineStore);
    const areaNft = useStore(areaNftStore);
    const mine = mines?.[0];
    const areaReservedSlotCount =
        area?.mine_slots?.filter(({ reserved }) => reserved)?.length || 0;
    const isMineLoading = useStore(getMinesEffect.pending);
    const isAreaLoading = useStore(getAreasEffect.pending);

    if (isAreaLoading || isMineLoading) {
        return <Skeleton />;
    }

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Title level={5} fontFamily="orbitron" className={styles.title}>
                    {t('components.common.mine.mineInfo').toUpperCase()}
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
                    <Area
                        area={area.id}
                        landlord={areaNft?.owner || '-'}
                        slots={`${areaReservedSlotCount}/${area.mine_slots.length}`}
                        rarity={areaNft ? rarityMap[areaNft.rarity] : '-'}
                    />
                ) : (
                    <Empty />
                )}
            </Col>
        </Row>
    );
};
