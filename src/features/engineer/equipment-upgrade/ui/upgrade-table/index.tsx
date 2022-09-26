import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetDataType } from 'entities/atomicassets';
import { getTimeLeft } from 'shared/ui/utils';
import { KeyValueTable } from 'shared/ui/ui-kit';
import {
    getMinMaxUpgradeTime,
    getTimeModifier,
    getPriceModifier,
} from '../../lib';
import { UpgradeKitType } from '../../model/upgrade-kit';
import styles from './styles.module.scss';

type Props = {
    isWaitCitizen: boolean;
    upgradeKit: UpgradeKitType;
    equipment: AssetDataType | null;
};

const UpgradeTable: FC<Props> = ({ equipment, isWaitCitizen, upgradeKit }) => {
    const { t } = useTranslation();

    const showData = !!upgradeKit && !isWaitCitizen && equipment;

    const timeModifier = getTimeModifier(upgradeKit) / 100;
    const priceModifier = getPriceModifier(upgradeKit) / 100;
    const { min: minTime, max: maxTime } = getMinMaxUpgradeTime(equipment);

    return (
        <KeyValueTable
            className={styles.table}
            items={{
                [t('pages.engineer.equipmentHall.estimateTime')]: showData
                    ? `${getTimeLeft(minTime * timeModifier)} - ${getTimeLeft(
                          maxTime * timeModifier
                      )}`
                    : '-',
                [t('components.common.price')]: showData
                    ? `${
                          priceModifier *
                          Number(equipment.data?.['DME to upgrade'] || 0)
                      } ${t('components.common.button.dme')}`
                    : '-',
            }}
        />
    );
};

export { UpgradeTable };
