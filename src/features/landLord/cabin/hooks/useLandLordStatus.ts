import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { useTableData } from 'shared';
import {
    getUserConfig,
    inventoriesStore,
    InventoryType,
    LOCATION_TO_ID,
    UserInfoType,
} from 'entities/smartcontract';
import { CABIN_STATUS } from '../constants';

export const useLandLordStatus = () => {
    const [status, setStatus] = useState<CABIN_STATUS>(CABIN_STATUS.no_area);
    const inventories = useStore(inventoriesStore);

    const userInfo = useTableData<UserInfoType>(getUserConfig);

    const hasPhysicalShift =
        userInfo?.[0]?.location === LOCATION_TO_ID.landlords_reception;

    useEffect(() => {
        const areaItem = inventories?.find(
            (inventory) => inventory.inv_type === InventoryType.areas
        );
        if (!areaItem) {
            setStatus(CABIN_STATUS.no_area);
        } else if (areaItem?.in_use === 0 || !hasPhysicalShift) {
            setStatus(CABIN_STATUS.engage);
        } else if (areaItem?.in_use === 1) {
            setStatus(CABIN_STATUS.setup);
        }
    }, [inventories, hasPhysicalShift]);

    return { status, hasPhysicalShift };
};
