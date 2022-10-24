import { useStore } from 'effector-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { getEngineerActiveContract } from 'features/engineer';
import { useAccountName, useReloadPage } from 'shared/lib/hooks';
import { Loader, LoadingSpin, Text } from 'shared/ui/ui-kit';
import { CountDown } from 'shared/ui/components';
import {
    $engineerContracts,
    getEquipmentByIdEffect,
} from '../../../equipment-upgrade/model';
import { State } from '../state';
import { UpgradeInfo } from '../upgrade-info';

const UpgradeInProgress: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const reloadPage = useReloadPage();
    const engineerContracts = useStore($engineerContracts);
    const equipmentLoading = useStore(getEquipmentByIdEffect.pending);

    const activeContract = getEngineerActiveContract(
        accountName,
        engineerContracts
    );

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
                                finishesAt={activeContract?.finishes_at}
                            />
                        </Text>
                    </Space>

                    {equipmentLoading ? <Loader /> : <UpgradeInfo />}
                </Space>
            }
        />
    );
};

export { UpgradeInProgress };
