import { createEffect } from 'effector';
import {
    getInventoryTableData,
    mineAssetTemplateId,
    UserInventoryType,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkContractEffect } from './checkContractEffect';

export const hasMineNftFilter = (inventories: UserInventoryType[] | null) => {
    return inventories?.find(
        ({ template_id }) => template_id === mineAssetTemplateId
    );
};

export const initialEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: inventory } = await getInventoryTableData({
            searchParam,
        });

        if (hasMineNftFilter(inventory)) {
            return await checkContractEffect({ searchParam });
        }

        return mineOwnerCabinStateResolver.setNeedMineNftState();
    }
);
