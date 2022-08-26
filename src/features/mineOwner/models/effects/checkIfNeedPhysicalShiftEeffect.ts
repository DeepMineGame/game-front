import { createEffect } from 'effector';
import { getTableData } from 'shared';
import {
    getMinesTableData,
    getUserConfig,
    LOCATION_TO_ID,
    MineDto,
    searchBy,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkIsMineSetEffect } from './checkIsMineSetEffect';

export const checkIfNeedPhysicalShiftEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: user } = await getTableData(getUserConfig(searchParam));
        const isUserOutsideFromMineDeckLocation =
            user?.[0]?.location !== LOCATION_TO_ID.mine_deck;

        const { rows: mines } = await getMinesTableData({
            searchParam,
            searchIdentificationType: searchBy.owner,
        });
        const userMine: MineDto | undefined = mines?.[0];
        if (isUserOutsideFromMineDeckLocation && !userMine) {
            return mineOwnerCabinStateResolver.needPhysicalShiftState();
        }
        return checkIsMineSetEffect({ searchParam });
    }
);
