import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { RightSquareFilled } from '@ant-design/icons';
import {
    $engineerContracts,
    $equipment,
    EQUIPMENT_SET_LENGTH,
    getEngineerActiveContract,
} from 'features/engineer';
import { useAccountName } from 'shared/lib/hooks';
import { Text } from 'shared/ui';

const UpgradeInfo: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const engineerContracts = useStore($engineerContracts);
    const equipment = useStore($equipment);
    const isEquipmentSet = equipment?.length === EQUIPMENT_SET_LENGTH;

    const activeContract = getEngineerActiveContract(
        accountName,
        engineerContracts
    );

    const upgradeToLvl =
        Number(
            activeContract?.attrs.find(({ key }) => key === 'level')?.value
        ) || 1;

    return (
        <div>
            <Text size="md" strong>
                {isEquipmentSet
                    ? t('Equipment set')
                    : equipment?.[0].data?.name}
            </Text>
            <div>
                <Text size="md" strong>
                    {t('components.common.level')}: {upgradeToLvl - 1}{' '}
                    <RightSquareFilled style={{ fontSize: '18px' }} />{' '}
                    {upgradeToLvl}
                </Text>
            </div>
        </div>
    );
};

export { UpgradeInfo };
