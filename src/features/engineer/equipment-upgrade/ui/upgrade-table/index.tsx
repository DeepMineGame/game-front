import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useTableData } from 'shared';
import { useStore } from 'effector-react';
import { AssetDataType } from 'entities/atomicassets';
import {
    ContractDto,
    getEkiatableConfig,
    getEkutableConfig,
    rarityMap,
    RarityType,
} from 'entities/smartcontract';
import { getTimeLeft } from 'shared/ui/utils';
import { KeyValueTable } from 'shared/ui/ui-kit';
import { $selectedKit, UpgradeKitType } from '../../model/upgrade-kit';
import { useUpgradeModifiers } from '../../lib/useUpgradeModifier';
import { EQUIPMENT_SET_LENGTH } from '../../constants';
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
    const selectedKit = useStore($selectedKit);

    const { t } = useTranslation();
    const isEquipmentSet = equipment?.length === EQUIPMENT_SET_LENGTH;

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
    const { data: uncommonUpgradeTableData } = useTableData<{
        equip_level: number;
        rarities: string[];
    }>(getEkiatableConfig);
    const uncommonPrice =
        Number(
            uncommonUpgradeTableData.find(
                ({ equip_level }) =>
                    equipment?.[0].data.level &&
                    Number(equipment[0].data.level) + 1 === equip_level
            )?.rarities[EquipmentRarityMapToNumber[equipment![0].data.rarity]]
        ) /
        10 ** 8;
    const price =
        selectedKit === UpgradeKitType.common ? commonPrice : uncommonPrice;
    return (
        <KeyValueTable
            className={styles.table}
            items={{
                [t('pages.engineer.equipmentHall.estimateTime')]: showData
                    ? `${getTimeLeft(minTime)} - ${getTimeLeft(maxTime)}`
                    : '-',
                [t('Kit price')]: showData
                    ? `${isEquipmentSet ? price * 5 : price} ${t(
                          'components.common.button.dme'
                      )}`
                    : '-',
                [t('Cost of execution')]: cost ? cost / 10 ** 8 : '-',
                [t('Rarity')]:
                    rarityMap[contract?.rarity || RarityType.undefined] || '-',
            }}
        />
    );
};

export { UpgradeTable };
