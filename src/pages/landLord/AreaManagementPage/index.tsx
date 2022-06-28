import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { Page, useInitialStoreEnrich } from 'shared';
import {
    AreaClaim,
    AreaManagementTable,
    Activity,
    MineCrewDataType,
} from 'features';
import {
    areasStore,
    inventoriesStore,
    InventoryType,
    MineDto,
    minesStore,
} from 'entities/smartcontract';
import styles from './styles.module.scss';

const getMineCrewContractors = (mine: MineDto) =>
    mine.contractor_slots.filter((v) => v.contractor.length > 0).length;

export const AreaManagementPage = () => {
    const { t } = useTranslation();
    useInitialStoreEnrich();
    const inventories = useStore(inventoriesStore);
    const area = useStore(areasStore);
    const mines = useStore(minesStore);

    const areaItem = inventories?.find(
        ({ inv_type }) => inv_type === InventoryType.areas
    );
    const areaId = areaItem ? +areaItem.asset_id : undefined;
    const isActive = !!areaItem?.in_use;
    const currentMineSlots = mines?.length ?? 0;
    const maxMineSlots = area?.[0].mine_slots.length ?? 0;
    const data = mines?.map(
        (mine) =>
            ({
                discord: 'https://discord.com/',
                mine: `ID${mine.id}`,
                status: mine.state,
                crew: [
                    getMineCrewContractors(mine),
                    mine.contractor_slots.length,
                ],
                ejection: 346,
                activity: Activity.high,
            } as MineCrewDataType)
    );

    return (
        <Page headerTitle={t('pages.areaManagement.title')}>
            <AreaClaim isActive={isActive} areaId={areaId} />
            <div className={styles.miningSlots}>
                {t('pages.areaManagement.mineSlots')}{' '}
                <span>
                    {currentMineSlots}/{maxMineSlots}
                </span>
            </div>
            <AreaManagementTable data={data} disabled={!isActive} />
        </Page>
    );
};
