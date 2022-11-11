import React, { FC } from 'react';
import { Col, Empty, Row } from 'antd';
import { Area, Button, KeyValueTable, Title } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { rarityMap } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import {
    areaNftStore,
    contractorAreaStore,
    ContractorGate,
    contractorMineStore,
} from '../model';

type Props = {
    accountName: string;
};

export const ContractorInfo: FC<Props> = ({ accountName }) => {
    useGate(ContractorGate, {
        searchParam: accountName,
    });
    const mine = useStore(contractorMineStore);
    const area = useStore(contractorAreaStore);
    const areaNft = useStore(areaNftStore);
    const areaReservedSlotCount =
        area?.mine_slots?.filter(({ reserved }) => reserved)?.length || 0;
    const { t } = useTranslation();

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Title level={5} fontFamily="orbitron" className={styles.title}>
                    {t('components.common.mine.mineInfo').toUpperCase()}
                </Title>
                {mine ? (
                    <KeyValueTable
                        items={{
                            [t('features.actions.mine')]: (
                                <Button type="link">ID {mine.id}</Button>
                            ),
                            [t('components.common.level')]: mine.level,
                            [t(
                                'pages.contractorStatsAndInfo.mineArea.sublevel'
                            )]: mine.sublevel,
                            [t('pages.contractorStatsAndInfo.mineArea.depth')]:
                                mine.layer_depth,
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
