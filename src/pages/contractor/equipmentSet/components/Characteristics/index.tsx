import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import {
    ContractorDto,
    getMinesEffect,
    minesStore,
} from 'entities/smartcontract';
import { CharacteristicsLine } from '../CharacteristicsLine';

import styles from './styles.module.scss';

interface Props {
    contractors: ContractorDto[] | null;
}

export const Characteristics = ({ contractors }: Props) => {
    const { t } = useTranslation();
    const mineStore = useStore(minesStore);
    useEffect(() => {
        const contractorAreaId = contractors?.[0]?.area_id;
        if (contractorAreaId) {
            getMinesEffect({ searchParam: contractorAreaId });
        }
    }, [contractors]);

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
