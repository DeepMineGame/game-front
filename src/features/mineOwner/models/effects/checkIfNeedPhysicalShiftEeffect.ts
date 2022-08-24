import { createEffect } from 'effector';
import { getTableData } from 'shared';
import { getUserConfig, LOCATION_TO_ID } from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkIsMineSetEffect } from './checkIsMineSetEffect';

export const checkIfNeedPhysicalShiftEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: user } = await getTableData(getUserConfig(searchParam));
        const isUserOutsideFromMineDeckLocation =
            user?.[0]?.location !== LOCATION_TO_ID.mine_deck;

        if (isUserOutsideFromMineDeckLocation) {
            return mineOwnerCabinStateResolver.needPhysicalShiftState();
        }
        return checkIsMineSetEffect({ searchParam });
    }
);
