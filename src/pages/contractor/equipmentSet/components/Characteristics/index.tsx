import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, useGate } from 'effector-react';

import { useAccountName } from 'shared';
import {
    $currentMine,
    estimatesMiningTimeStore,
    MiningPageGate,
} from 'features';
import { CharacteristicsLine } from '../CharacteristicsLine';

import styles from './styles.module.scss';

export const Characteristics = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(MiningPageGate, { searchParam: accountName });
    const estTime = useStore(estimatesMiningTimeStore);
    const mineStore = useStore($currentMine);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {t('pages.equipmentSet.characteristics.title')}
            </div>
            <div className={styles.content}>
                <CharacteristicsLine
                    name={t('features.mining.mineLevel')}
                    value={mineStore?.[0]?.level ?? '-'}
                />
                <CharacteristicsLine
                    name={t('features.mining.mineSublevel')}
                    value={mineStore?.[0]?.sublevel ?? '-'}
                />
                <CharacteristicsLine
                    name={t('pages.equipmentSet.characteristics.mineDepth')}
                    value={mineStore?.[0]?.layer_depth ?? '-'}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimatesMiningTime'
                    )}
                    value={estTime}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimatesAmountDME'
                    )}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimateMiningEfficiency'
                    )}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimateMiningPower'
                    )}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.sublevelEfficiensy'
                    )}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.equipmentBreakageProbabillity'
                    )}
                />
                <CharacteristicsLine
                    name={t('pages.equipmentSet.characteristics.fossilChance')}
                />
            </div>
        </div>
    );
};
