import { createEffect } from 'effector';
import {
    getMinesTableData,
    MineDto,
    MineState,
    searchBy,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';

export const checkIsMineActiveEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: mines } = await getMinesTableData<MineDto>({
            searchParam,
            searchIdentificationType: searchBy.owner,
        });
        const userMine: MineDto | undefined = mines?.[0];

        if (userMine?.state !== MineState.activated) {
            return mineOwnerCabinStateResolver.needActivateMineState();
        }

        return mineOwnerCabinStateResolver.everythingIsDoneState();
    }
);
