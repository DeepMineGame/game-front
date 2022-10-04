import { FC } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { AssetDataType } from 'entities/atomicassets';
import { Text } from 'shared/ui/ui-kit';
import { getKitImage } from 'shared/lib/utils';
import {
    $showKitModal,
    $upgradeKit,
    openModal,
    closeModal,
    setupKit,
    $selectedKit,
    selectKit,
} from '../../model/upgrade-kit';
import { UpgradeSlot } from '../upgrade-slot';
import { UpgradeKitModal } from '../upgrade-kit-modal';

type Props = {
    isWaitCitizen: boolean;
    equipment: AssetDataType | null;
    disabled: boolean;
};

const UpgradeKit: FC<Props> = ({ equipment, disabled, isWaitCitizen }) => {
    const { t } = useTranslation();
    const selectedKit = useStore($selectedKit);
    const showKitModal = useStore($showKitModal);
    const upgradeKit = useStore($upgradeKit);

    return (
        <Space direction="vertical" size={16}>
            <Text>{t('pages.engineer.upgradeKit')}</Text>
            <UpgradeSlot
                tooltipText={
                    !equipment
                        ? t(
                              'pages.engineer.slotWillBeAvailableAfterEquipmentSlotFilled'
                          )
                        : ''
                }
                disabled={disabled}
                notAllowed={!equipment || isWaitCitizen}
                onClick={!disabled ? openModal : undefined}
            >
                {upgradeKit && (
                    <img
                        src={getKitImage(upgradeKit)}
                        alt={`upgrade kit ${upgradeKit}`}
                        style={{ transform: 'scale(1.15)' }}
                    />
                )}
            </UpgradeSlot>

            <UpgradeKitModal
                equipment={equipment}
                value={selectedKit}
                onSelect={selectKit}
                visible={showKitModal}
                onCancel={closeModal}
                onOk={(event) => {
                    closeModal(event);
                    setupKit(selectedKit);
                }}
                okButtonProps={{ disabled: !selectedKit }}
            />
        </Space>
    );
};

export { UpgradeKit };
