import { useTranslation } from 'react-i18next';
import { useStore, useGate, useEvent } from 'effector-react';

import { useAccountName } from 'shared';
import {
    $currentMine,
    $dmeAmountEstimate,
    $generalEquipmentBreakageProbability,
    $isNotFullEquipmentsSet,
    estimatesMiningTimeStore,
    MiningPageGate,
    updateDmeAmountEstimateEvent,
} from 'features';
import { useEffect } from 'react';
import {
    getMalfunctionProbabilityTranslation,
    NumericMalfunctionProbability,
} from 'entities/smartcontract';
import { CharacteristicsLine } from '../CharacteristicsLine';

import styles from './styles.module.scss';

export const Characteristics = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(MiningPageGate, { searchParam: accountName });
    const estTime = useStore(estimatesMiningTimeStore);
    const mineStore = useStore($currentMine);
    const equipmentBreakageProbabillity = useStore(
        $generalEquipmentBreakageProbability
    );
    const dmeAmountEstimate = useStore($dmeAmountEstimate);
    const isNotFullEquipmentsSet = useStore($isNotFullEquipmentsSet);
    const updateDmeAmountEstimate = useEvent(updateDmeAmountEstimateEvent);

    useEffect(() => {
        let timerId: number;

        if (!isNotFullEquipmentsSet) {
            timerId = window.setInterval(
                () => updateDmeAmountEstimate({ searchParam: accountName }),
                10000
            );
        }

        return () => window.clearInterval(timerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNotFullEquipmentsSet]);

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
                    value={
                        mineStore?.[0]?.sublevel ? mineStore[0].sublevel + 1 : 1
                    }
                />
                <CharacteristicsLine
                    name={t('pages.equipmentSet.characteristics.mineDepth')}
                    value={mineStore?.[0]?.layer_depth ?? '-'}
                />
                <CharacteristicsLine
                    name={t('Estimated mining time')}
                    value={estTime}
                />
                <CharacteristicsLine
                    name={t('Equipment Breakdown Probability')}
                    value={`${t(
                        getMalfunctionProbabilityTranslation(
                            Number(
                                equipmentBreakageProbabillity * 100
                            ) as NumericMalfunctionProbability
                        )
                    )}`}
                />
                {!isNotFullEquipmentsSet && (
                    <CharacteristicsLine
                        name={t(
                            'pages.equipmentSet.characteristics.estimatesAmountDME'
                        )}
                        value={`${Number(
                            dmeAmountEstimate.min.toFixed(2)
                        )} - ${Number(dmeAmountEstimate.max.toFixed(2))}`}
                    />
                )}
            </div>
        </div>
    );
};
