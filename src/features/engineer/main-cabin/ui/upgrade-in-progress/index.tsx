import { useStore } from 'effector-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { useReloadPage } from 'shared/lib/hooks';
import { Loader, LoadingSpin, Text } from 'shared/ui/ui-kit';
import { CountDown } from 'shared/ui/components';
import {
    $engineerContracts,
    $equipment,
    getEquipmentByIdEffect,
} from '../../../equipment-upgrade/model';
import { State } from '../state';

const UpgradeInProgress: FC = () => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const engineerContracts = useStore($engineerContracts);
    const equipment = useStore($equipment);
    const equipmentLoading = useStore(getEquipmentByIdEffect.pending);

    return (
        <State
            title={t('pages.engineer.upgradeInProgress')}
            content={
                <Space direction="vertical" size={38}>
                    <Space size={8}>
                        <LoadingSpin size="xl" />
                        <Text size="md">
                            <CountDown
                                onFinish={reloadPage}
                                finishesAt={engineerContracts?.[0]?.finishes_at}
                            />
                        </Text>
                    </Space>

                    {equipmentLoading ? <Loader /> : equipment?.data.name}
                </Space>
            }
        />
    );
};

export { UpgradeInProgress };
