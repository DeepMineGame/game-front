import React from 'react';
import { useTranslation } from 'react-i18next';

import { KeyValueTable } from 'shared';
import styles from './styles.module.scss';

export const MineAreaInfo = () => {
    const { t } = useTranslation();

    const mineInfoData = {
        [t('pages.contractorStatsAndInfo.mineArea.mine')]: 'ID 34658645',
        [t('pages.contractorStatsAndInfo.mineArea.mineOwner')]:
            'Foxelchanger324',
        [t('pages.contractorStatsAndInfo.mineArea.mineRarity')]: 'Common',
        [t('pages.contractorStatsAndInfo.mineArea.level')]: 3,
        [t('pages.contractorStatsAndInfo.mineArea.sublevel')]: 2,
        [t('pages.contractorStatsAndInfo.mineArea.depth')]: 5,
        [t('pages.contractorStatsAndInfo.mineArea.mineFee')]: '4$',
    };

    const mineSubInfoData = {
        [t('pages.contractorStatsAndInfo.mineArea.miningDifficulty')]: 25,
        [t('pages.contractorStatsAndInfo.mineArea.miningEfficiency')]: 356,
        [t('pages.contractorStatsAndInfo.mineArea.fossilChance')]: '7%',
        [t('pages.contractorStatsAndInfo.mineArea.stability')]: '95%',
        [t('pages.contractorStatsAndInfo.mineArea.habitation')]: '34/53',
    };

    const areaInfoData = {
        [t('pages.contractorStatsAndInfo.mineArea.area')]: 'ID 34658645',
        [t('pages.contractorStatsAndInfo.mineArea.landlord')]:
            'Foxelchanger324',
        [t('pages.contractorStatsAndInfo.mineArea.areaRarity')]: 'Common',
        [t('pages.contractorStatsAndInfo.mineArea.minesOnArea')]: 3,
        [t('pages.contractorStatsAndInfo.mineArea.areaFee')]: 2,
    };

    const areaSubInfoData = {
        [t('pages.contractorStatsAndInfo.mineArea.miningDifficulty')]: 25,
        [t('pages.contractorStatsAndInfo.mineArea.miningEfficiency')]: 356,
        [t('pages.contractorStatsAndInfo.mineArea.fossilChance')]: '7%',
        [t('pages.contractorStatsAndInfo.mineArea.stability')]: '95%',
        [t('pages.contractorStatsAndInfo.mineArea.saturation')]: '13%',
    };

    return (
        <div className={styles.mineAreaInfo}>
            <div className={styles.info}>
                <div className={styles.initialInfo}>
                    <div className={styles.title}>
                        {t('pages.contractorStatsAndInfo.mineArea.mineInfo')}
                    </div>
                    <KeyValueTable
                        items={mineInfoData}
                        coloredItems={Object.keys(mineInfoData).slice(0, 2)}
                    />
                </div>
                <KeyValueTable
                    className={styles.subInfo}
                    items={mineSubInfoData}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.initialInfo}>
                    <div className={styles.title}>
                        {t('pages.contractorStatsAndInfo.mineArea.areaInfo')}
                    </div>
                    <KeyValueTable
                        items={areaInfoData}
                        coloredItems={Object.keys(areaInfoData).slice(0, 2)}
                    />
                </div>
                <KeyValueTable
                    className={styles.subInfo}
                    items={areaSubInfoData}
                />
            </div>
        </div>
    );
};
