import { createEffect } from 'effector';
import {
    getMinesTableData,
    MineDto,
    MineState,
    searchBy,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkHasCrewEffect } from './checkHasCrewEffect';

export const checkMineStateEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const data = await getMinesTableData<MineDto>({
            searchParam,
            searchIdentificationType: searchBy.owner,
        });
        const userMine: MineDto | undefined = data?.rows?.[0];
        if (userMine?.state === MineState.depth_changing) {
            return mineOwnerCabinStateResolver.mineIsDepthChangingState();
        }

        if (
            userMine?.state === MineState.setuped ||
            userMine?.state === MineState.activated
        ) {
            return checkHasCrewEffect({ searchParam });
        }

        if (userMine?.state === MineState.deactivated) {
            return mineOwnerCabinStateResolver.needActivateMineState();
        }

        return mineOwnerCabinStateResolver.needSetupMineState();
    }
);
