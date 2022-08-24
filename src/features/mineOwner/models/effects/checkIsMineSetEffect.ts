import { createEffect } from 'effector';
import { getMinesTableData, MineDto, searchBy } from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkHasCrewEffect } from './checkHasCrewEffect';

export const checkIsMineSetEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const { rows: mines } = await getMinesTableData({
            searchParam,
            searchIdentificationType: searchBy.owner,
        });
        const userMine: MineDto | undefined = mines?.[0];

        if (userMine) {
            return checkHasCrewEffect({ searchParam });
        }
        return mineOwnerCabinStateResolver.needSetupMineState();
    }
);
