import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { serviceMarket } from 'app/router/paths';
import { InventoryIdType } from 'entities/smartcontract';
import { AssetDataType } from 'entities/atomicassets';
import { CabinStatus } from 'entities/engineer';
import { getImagePath } from 'shared/lib/utils';
import { Loader, LoadingSpin, Text } from 'shared/ui/ui-kit';
import { UpgradeSlot } from '../upgrade-slot';
import { UpgradeKit } from '../upgrade-kit';

type Props = {
    equipment: AssetDataType | null;
    isLoading: boolean;
    isWaitCitizen: boolean;
    status: CabinStatus;
};

const tooltipText = {
    // TODO: remove NeedCertificate
    [CabinStatus.NeedCertificate]: 'components.common.comingSoon',
    [CabinStatus.NeedContract]: 'pages.engineer.signOrCreateContract',
    [CabinStatus.NeedCitizen]: 'pages.engineer.waitForCitizenWhoSignOrder',
};

const disabledStatuses = [
    CabinStatus.NeedCitizen,
    CabinStatus.NeedContract,
    CabinStatus.UpgradeInProgress,
    CabinStatus.UpgradeCompleted,
    CabinStatus.CanSeeStats,
];

const EquipmentContent: FC<{
    equipment: AssetDataType | null;
    isLoading: boolean;
    isWaitCitizen: boolean;
}> = ({ equipment, isWaitCitizen, isLoading }) => {
    if (isWaitCitizen) {
        return <LoadingSpin size="md" />;
    }

    if (isLoading) {
        return <Loader centered />;
    }

    if (equipment) {
        return (
            <img
                height="100%"
                width="100%"
                src={getImagePath(
                    +equipment.template.template_id as InventoryIdType
                )}
                alt="equipment card"
                style={{ transform: 'scale(1.05)' }}
            />
        );
    }

    return <PlusOutlined />;
};

const EquipmentSetup: FC<Props> = ({
    equipment,
    isLoading,
    isWaitCitizen,
    status,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const upgradeKitDisabled = disabledStatuses.includes(status);

    // TODO: remove after close tests
    const statusForTest = CabinStatus.NeedCertificate;

    return (
        <div>
            <Space size={26}>
                <Space direction="vertical" align="start" size={16}>
                    <Text>{t('pages.engineer.equipment')}</Text>
                    <UpgradeSlot
                        disabled
                        onClick={
                            status === CabinStatus.NeedContract
                                ? () => navigate(serviceMarket)
                                : undefined
                        }
                        visible={
                            // TODO: status === NeedContract
                            statusForTest === CabinStatus.NeedCertificate
                                ? true
                                : undefined
                        }
                        placement="top"
                        tooltipText={t(
                            tooltipText[
                                statusForTest as keyof typeof tooltipText
                            ]
                        )}
                    >
                        <EquipmentContent
                            equipment={equipment}
                            isLoading={isLoading}
                            isWaitCitizen={isWaitCitizen}
                        />
                    </UpgradeSlot>
                </Space>

                <UpgradeKit
                    disabled={upgradeKitDisabled || !equipment || isWaitCitizen}
                    equipment={equipment}
                    isWaitCitizen={isWaitCitizen}
                />

                <Space direction="vertical" size={16}>
                    <Text>{t('pages.engineer.boosters')}</Text>
                    <UpgradeSlot
                        notAllowed
                        tooltipText={t('components.common.comingSoon')}
                    />
                </Space>
            </Space>
        </div>
    );
};

export { EquipmentSetup };
