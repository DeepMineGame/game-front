import { useMemo } from 'react';
import { useStore } from 'effector-react';

import { useTableData } from 'shared';
import {
    getUserConfig,
    InUseType,
    inventoriesStore,
    InventoryType,
    LOCATION_TO_ID,
    minesStore,
    UserInfoType,
} from 'entities/smartcontract';
import { CABIN_STATUS } from '../constants';

export const useLandLordStatus = () => {
    const inventories = useStore(inventoriesStore);
    const mines = useStore(minesStore);

    const { data: userInfo } = useTableData<UserInfoType>(getUserConfig);

    const hasPhysicalShift =
        userInfo?.[0]?.location === LOCATION_TO_ID.landlords_reception;

    // TODO: add searching and mine_is_set statuses after Service Market
    const status = useMemo(() => {
        const areaItem = inventories?.find(
            (inventory) => inventory.inv_type === InventoryType.areas
        );

        if (!areaItem) {
            return CABIN_STATUS.no_area;
        }

        if (areaItem.in_use === InUseType.notInUse) {
            return CABIN_STATUS.engage;
        }

        if (areaItem.in_use === InUseType.inUse) {
            if (mines && mines.length >= 2) {
                return CABIN_STATUS.stats;
            }

            return CABIN_STATUS.setup;
        }

        return CABIN_STATUS.no_area;
    }, [inventories, mines]);

    return { status, hasPhysicalShift };
};
