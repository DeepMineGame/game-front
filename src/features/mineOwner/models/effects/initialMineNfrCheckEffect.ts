import { createEffect } from 'effector';
import {
    getInventoryTableData,
    mineAssetTemplateId,
    UserInventoryType,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkLandLordContractMineOwnerActiveContractEffect } from './checkLandLordContractMineOwnerActiveContractEffect';

export const hasMineNftFilter = (inventories: UserInventoryType[] | null) => {
    return inventories?.find(
        ({ template_id }) => template_id === mineAssetTemplateId
    );
};

export const initialMineNfrCheckEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const inventory = await getInventoryTableData<UserInventoryType>({
            searchParam,
        });

        if (hasMineNftFilter(inventory)) {
            return await checkLandLordContractMineOwnerActiveContractEffect({
                searchParam,
            });
        }

        return mineOwnerCabinStateResolver.setNeedMineNftState();
    }
);
