import { Col, Row, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { Loader, useAccountName } from 'shared';
import { AreasDto, OrderState } from 'entities/smartcontract';
import { $LandlordContracts, LandlordContractsGate } from '../../../models';

export const SlotStatistics: FC<{ area: AreasDto | null }> = ({ area }) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(LandlordContractsGate, { searchParam: accountName });
    const landlordContracts = useStore($LandlordContracts);

    if (!area) {
        return <Loader centered size="large" />;
    }
    const lockedSlots = area.mine_slots.filter(
        ({ reserved }) => reserved
    )?.length;
    const availableSlots = area.mine_slots.filter(
        ({ reserved, mine_id }) => !reserved && !mine_id
    )?.length;

    const active = landlordContracts.filter(
        ({ computed }) => computed?.status === OrderState.ValidContract
    );

    return (
        <Row justify="center">
            <Col span={2}>
                <Statistic
                    title={t('Total slots')}
                    value={area.mine_slots.length}
                />
            </Col>
            <Col span={2}>
                <Statistic title={t('Locked slots')} value={lockedSlots} />
            </Col>
            <Col span={2}>
                <Statistic
                    title={t('Available slots')}
                    value={availableSlots}
                />
            </Col>
            <Col span={2}>
                <Statistic title={t('Active')} value={active.length} />
            </Col>
        </Row>
    );
};
