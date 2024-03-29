import { createEffect } from 'effector';
import {
    getInventoryTableData,
    mineAssetTemplateId,
    UserInventoryType,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkLandLordContractMineOwnerActiveContractEffect } from './checkLandLordContractMineOwnerActiveContractEffect';

export const hasMineNftFilter = (inventories: UserInventoryType[] | null) => {
    return inventories?.find(({ template_id }) =>
        mineAssetTemplateId.includes(template_id)
    );
};

export const initialMineNfrCheckEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const data = await getInventoryTableData<UserInventoryType>({
            searchParam,
        });

        if (hasMineNftFilter(data?.rows || null)) {
            return await checkLandLordContractMineOwnerActiveContractEffect({
                searchParam,
            });
        }

        return mineOwnerCabinStateResolver.setNeedMineNftState();
    }
);
