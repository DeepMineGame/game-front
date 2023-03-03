import { useMemo } from 'react';
import { useStore } from 'effector-react';

import { InUseType, $inventory, InventoryType } from 'entities/smartcontract';
import { CABIN_STATUS } from '../constants';
import { minesForAreaSlots } from '../../areaManagement';

export const useLandLordStatus = () => {
    const inventories = useStore($inventory);
    const mines = useStore(minesForAreaSlots);

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
            if (mines && mines.length >= 1) {
                return CABIN_STATUS.stats;
            }

            return CABIN_STATUS.setup;
        }

        return CABIN_STATUS.no_area;
    }, [inventories, mines]);

    return { status };
};
