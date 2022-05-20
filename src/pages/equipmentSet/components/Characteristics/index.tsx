import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { minesStore } from 'entities/smartcontracts';
import { CharacteristicsLine } from '../CharacteristicsLine';

import styles from './styles.module.scss';

export const Characteristics = () => {
    const { t } = useTranslation();
    const mineStore = useStore(minesStore);

    return (
        <div className={styles.container}>
            <div className={styles.title}>{t('characteristics.title')}</div>
            <div className={styles.content}>
                <CharacteristicsLine
                    name={t('characteristics.mineLevel')}
                    value={mineStore?.[0]?.level ?? '-'}
                />
                <CharacteristicsLine
                    name={t('characteristics.mineSublevel')}
                    value={mineStore?.[0]?.sub_level ?? '-'}
                />
                <CharacteristicsLine
                    name={t('characteristics.mineDepth')}
                    value={mineStore?.[0]?.layer_depth ?? '-'}
                />
                <CharacteristicsLine
                    name={t('characteristics.estimatesMiningTime')}
                    value="-"
                />
                <CharacteristicsLine
                    name={t('characteristics.estimatesAmountDME')}
                    value="9999.99900000 - 9999.99999999"
                />
                <CharacteristicsLine
                    name={t('characteristics.estimateMiningEfficiency')}
                    value={9988}
                />
                <CharacteristicsLine
                    name={t('characteristics.estimateMiningPower')}
                    value="1242.99900000 - 3349.99999999"
                />
                <CharacteristicsLine
                    name={t('characteristics.sublevelEfficiensy')}
                    value="90% - 100%"
                />
                <CharacteristicsLine
                    name={t('characteristics.equipmentBreakageProbabillity')}
                    value="20%"
                />
                <CharacteristicsLine
                    name={t('characteristics.fossilChance')}
                    value="10%"
                />
            </div>
        </div>
    );
};
