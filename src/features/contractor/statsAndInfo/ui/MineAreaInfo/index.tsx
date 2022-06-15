import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { KeyValueTable, Title, useInitialStoreEnrich } from 'shared';
import { AreaRarity, areasStore, minesStore } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const MineAreaInfo = () => {
    useInitialStoreEnrich();
    const { t } = useTranslation();
    const areas = useStore(areasStore);
    const mines = useStore(minesStore);
    const userMine = mines?.[0];
    const userArea = areas?.[0];

    const mineInfoData = {
        [t('pages.contractorStatsAndInfo.mineArea.mine')]: userMine
            ? `ID ${userMine.area_id}`
            : '-',
        [t('pages.contractorStatsAndInfo.mineArea.mineOwner')]:
            userMine?.owner ?? '-',
        [t('pages.contractorStatsAndInfo.mineArea.mineRarity')]: 'Common',
        [t('pages.contractorStatsAndInfo.mineArea.level')]:
            userMine?.level ?? '-',
        [t('pages.contractorStatsAndInfo.mineArea.sublevel')]:
            userMine?.sub_level ?? '-',
        [t('pages.contractorStatsAndInfo.mineArea.depth')]:
            userMine?.layer_depth ?? '-',
        [t('pages.contractorStatsAndInfo.mineArea.mineFee')]: '4%',
    };

    const mineSubInfoData = {
        [t('pages.contractorStatsAndInfo.mineArea.miningDifficulty')]: 25,
        [t('pages.contractorStatsAndInfo.mineArea.miningEfficiency')]: 356,
        [t('pages.contractorStatsAndInfo.mineArea.fossilChance')]: '7%',
        [t('pages.contractorStatsAndInfo.mineArea.stability')]: '95%',
        [t('pages.contractorStatsAndInfo.mineArea.habitation')]: '34/53',
    };

    const areaInfoData = {
        [t('pages.contractorStatsAndInfo.mineArea.area')]: userArea
            ? `ID ${userArea.id}`
            : '-',
        [t('pages.contractorStatsAndInfo.mineArea.landlord')]:
            'Foxelchanger324',
        [t('pages.contractorStatsAndInfo.mineArea.areaRarity')]: userArea
            ? AreaRarity[userArea.rarity]
            : '-',
        [t('pages.contractorStatsAndInfo.mineArea.minesOnArea')]:
            userArea?.mines_slots.filter((v) => !!v).length ?? '-',
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
                    <Title
                        fontFamily="orbitron"
                        level={5}
                        className={styles.title}
                    >
                        {t('pages.contractorStatsAndInfo.mineArea.mineInfo')}
                    </Title>
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
                    <Title
                        fontFamily="orbitron"
                        level={5}
                        className={styles.title}
                    >
                        {t('pages.contractorStatsAndInfo.mineArea.areaInfo')}
                    </Title>
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
