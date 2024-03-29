import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import { KeyValueTable, Title, useAccountName } from 'shared';
import { AreaRarity } from 'entities/smartcontract';
import { areaForMine, UserMineGate, userMineStore } from '../../userMineModel';
import styles from './styles.module.scss';

export const MineAreaInfo: FC = () => {
    const accountName = useAccountName();

    useGate(UserMineGate, { searchParam: accountName });
    const { t } = useTranslation();
    const areas = useStore(areaForMine);
    const mines = useStore(userMineStore);
    const userMine = mines?.[0];
    const userArea = areas?.[0];
    const mineInfoData = {
        [t('components.common.mine.title')]: userMine
            ? `ID ${userMine.id}`
            : '-',
        [t('pages.contractorStatsAndInfo.mineArea.mineOwner')]:
            userMine?.owner ?? '-',
        [t('pages.contractorStatsAndInfo.mineArea.level')]:
            userMine?.level ?? '-',
        [t('pages.contractorStatsAndInfo.mineArea.sublevel')]:
            userMine?.sublevel ?? '-',
        [t('pages.contractorStatsAndInfo.mineArea.depth')]:
            userMine?.layer_depth ?? '-',
    };

    const areaInfoData = {
        [t('components.common.area')]: userArea ? `ID ${userArea.id}` : '-',
        [t('pages.contractorStatsAndInfo.mineArea.landlord')]:
            userArea?.owner || '-',
        [t('pages.contractorStatsAndInfo.mineArea.areaRarity')]: userArea
            ? AreaRarity[userArea.rarity]
            : '-',
        [t('pages.contractorStatsAndInfo.mineArea.minesOnArea')]:
            userArea?.mine_slots.filter((v) => !!v).length ?? '-',
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
                        {t('components.common.mine.mineInfo')}
                    </Title>
                    <KeyValueTable
                        items={mineInfoData}
                        coloredItems={Object.keys(mineInfoData).slice(0, 2)}
                    />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.initialInfo}>
                    <Title
                        fontFamily="orbitron"
                        level={5}
                        className={styles.title}
                    >
                        {t('components.common.areaInfo')}
                    </Title>
                    <KeyValueTable
                        items={areaInfoData}
                        coloredItems={Object.keys(areaInfoData).slice(0, 2)}
                    />
                </div>
            </div>
        </div>
    );
};
