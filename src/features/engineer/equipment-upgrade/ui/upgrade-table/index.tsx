import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetDataType } from 'entities/atomicassets';
import { ContractDto, rarityMap, RarityType } from 'entities/smartcontract';
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

const UpgradeTable: FC<Props> = ({
    equipment,
    isWaitCitizen,
    upgradeKit,
    cost,
    contract,
}) => {
    const { t } = useTranslation();

    const showData = !!upgradeKit && !isWaitCitizen && equipment;

    const { price, minTime, maxTime } = useUpgradeModifiers(
        upgradeKit,
        equipment
    );

    return (
        <KeyValueTable
            className={styles.table}
            items={{
                [t('pages.engineer.equipmentHall.estimateTime')]: showData
                    ? `${getTimeLeft(minTime)} - ${getTimeLeft(maxTime)}`
                    : '-',
                [t('Kit price')]: showData
                    ? `${price} ${t('components.common.button.dme')}`
                    : '-',
                [t('Cost of execution')]: cost ? cost / 10 ** 8 : '-',
                [t('Rarity')]:
                    rarityMap[contract?.rarity || RarityType.undefined] || '-',
            }}
        />
    );
};

export { UpgradeTable };
