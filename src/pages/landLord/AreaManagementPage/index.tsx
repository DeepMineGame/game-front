import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { Page, useAccountName } from 'shared';
import {
    AreaClaim,
    AreaManagementTable,
    minesForAreaSlots,
    userAreaNftStore,
} from 'features';
import { areasStore } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const AreaManagementPage = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const mines = useStore(minesForAreaSlots);
    const area = useStore(areasStore);

    const areas = useStore(userAreaNftStore);
    const areaItem = areas?.[0];
    const areaId = areaItem ? +areaItem.asset_id : undefined;
    const isActive = !!areaItem?.in_use;

    const currentMineSlots = mines?.length ?? 0;
    const maxMineSlots = area?.[0]?.mine_slots.length ?? 0;

    return (
        <Page headerTitle={t('pages.areaManagement.title')}>
            <AreaClaim isActive={isActive} areaId={areaId} />
            <div className={styles.miningSlots}>
                {t('pages.areaManagement.mineSlots')}{' '}
                <span>
                    {currentMineSlots}/{maxMineSlots}
                </span>
            </div>
            {accountName && (
                <AreaManagementTable
                    disabled={!isActive}
                    accountName={accountName}
                />
            )}
        </Page>
    );
};
