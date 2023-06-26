import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useTableData } from 'shared';
import { AssetDataType } from 'entities/atomicassets';
import {
    ContractDto,
    getEkutableConfig,
    rarityMap,
    RarityType,
} from 'entities/smartcontract';
import { getTimeLeft } from 'shared/ui/utils';
import { KeyValueTable } from 'shared/ui/ui-kit';
import { UpgradeKitType } from '../../model/upgrade-kit';
import { useUpgradeModifiers } from '../../lib/useUpgradeModifier';
import styles from './styles.module.scss';

type Props = {
    isWaitCitizen: boolean;
    upgradeKit: UpgradeKitType;
    equipment: AssetDataType[] | null;
    cost?: number;
    contract?: ContractDto;
};
enum EquipmentRarityMapToNumber {
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary,
}
const UpgradeTable: FC<Props> = ({
    equipment,
    isWaitCitizen,
    upgradeKit,
    cost,
    contract,
}) => {
    const { t } = useTranslation();

    const showData = !!upgradeKit && !isWaitCitizen && equipment;

    const { minTime, maxTime } = useUpgradeModifiers(upgradeKit, equipment);

    const { data: commonUpgradeTableData } = useTableData<{
        equip_level: number;
        rarities: string[];
    }>(getEkutableConfig);

    const commonPrice =
        Number(
            commonUpgradeTableData.find(
                ({ equip_level }) =>
                    equipment?.[0].data.level &&
                    Number(equipment[0].data.level) + 1 === equip_level
            )?.rarities[EquipmentRarityMapToNumber[equipment![0].data.rarity]]
        ) /
        10 ** 8;

    return (
        <KeyValueTable
            className={styles.table}
            items={{
                [t('pages.engineer.equipmentHall.estimateTime')]: showData
                    ? `${getTimeLeft(minTime)} - ${getTimeLeft(maxTime)}`
                    : '-',
                [t('Kit price')]: showData
                    ? `${commonPrice} ${t('components.common.button.dme')}`
                    : '-',
                [t('Cost of execution')]: cost ? cost / 10 ** 8 : '-',
                [t('Rarity')]:
                    rarityMap[contract?.rarity || RarityType.undefined] || '-',
            }}
        />
    );
};

export { UpgradeTable };
