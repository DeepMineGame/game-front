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
                    name={t('pages.equipmentSet.characteristics.mineLevel')}
                    value={mineStore?.[0]?.level ?? '-'}
                />
                <CharacteristicsLine
                    name={t('pages.equipmentSet.characteristics.mineSublevel')}
                    value={mineStore?.[0]?.sub_level ?? '-'}
                />
                <CharacteristicsLine
                    name={t('pages.equipmentSet.characteristics.mineDepth')}
                    value={mineStore?.[0]?.layer_depth ?? '-'}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimatesMiningTime'
                    )}
                    value="-"
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimatesAmountDME'
                    )}
                    value="9999.99900000 - 9999.99999999"
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimateMiningEfficiency'
                    )}
                    value={9988}
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.estimateMiningPower'
                    )}
                    value="1242.99900000 - 3349.99999999"
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.sublevelEfficiensy'
                    )}
                    value="90% - 100%"
                />
                <CharacteristicsLine
                    name={t(
                        'pages.equipmentSet.characteristics.equipmentBreakageProbabillity'
                    )}
                    value="20%"
                />
                <CharacteristicsLine
                    name={t('pages.equipmentSet.characteristics.fossilChance')}
                    value="10%"
                />
            </div>
        </div>
    );
};
