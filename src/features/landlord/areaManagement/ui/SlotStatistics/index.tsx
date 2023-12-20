import { Col, Row, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { LandlordManagementData } from 'entities/game-stat';

export const SlotStatistics: FC<{
    landLordManagementData: LandlordManagementData | null;
}> = ({ landLordManagementData }) => {
    const { t } = useTranslation();

    if (landLordManagementData === null) {
        return null;
    }

    return (
        <Row justify="center">
            <Col span={2}>
                <Statistic
                    title={t('Total slots')}
                    value={landLordManagementData.area_total_slots}
                />
            </Col>
            <Col span={2}>
                <Statistic
                    title={t('Locked slots')}
                    value={landLordManagementData?.area_reserved_slots}
                />
            </Col>
            <Col span={2}>
                <Statistic
                    title={t('Available slots')}
                    value={landLordManagementData.area_available_slots}
                />
            </Col>
            <Col span={2}>
                <Statistic
                    title={t('Active')}
                    value={landLordManagementData.area_active_slots}
                />
            </Col>
        </Row>
    );
};
