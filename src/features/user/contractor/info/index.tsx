import React, { FC } from 'react';
import { Col, Empty, Row } from 'antd';
import { Button, KeyValueTable, Title } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { ContractorDto, rarityMap } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import {
    areaNftStore,
    contractorAreaStore,
    ContractorGate,
    contractorMineStore,
} from './model';

type Props = {
    contractor: ContractorDto;
};

export const Contractor: FC<Props> = ({ contractor }) => {
    useGate(ContractorGate, {
        mineId: contractor.mine_id,
        areaId: Number(contractor.area_id),
    });
    const mine = useStore(contractorMineStore);
    const area = useStore(contractorAreaStore);
    const areaNft = useStore(areaNftStore);

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
