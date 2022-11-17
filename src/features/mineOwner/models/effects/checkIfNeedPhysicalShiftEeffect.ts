import { createEffect } from 'effector';
import { getTableData } from 'shared';
import {
    getMinesTableData,
    getUserConfig,
    LOCATION_TO_ID,
    MineDto,
    searchBy,
    UserDto,
} from 'entities/smartcontract';
import { mineOwnerCabinStateResolver } from '../mineOwnerCabinState';
import { checkMineStateEffect } from './checkMineStateEffect';

export const checkIfNeedPhysicalShiftEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const dataUser = await getTableData<UserDto>(
            getUserConfig(searchParam)
        );

        const isUserOutsideFromMineDeckLocation =
            dataUser?.rows?.[0]?.location !== LOCATION_TO_ID.mine_deck;

        const dataMines = await getMinesTableData<MineDto>({
            searchParam,
            searchIdentificationType: searchBy.owner,
        });
        const userMine: MineDto | undefined = dataMines?.rows?.[0];
        if (isUserOutsideFromMineDeckLocation && !userMine) {
            return mineOwnerCabinStateResolver.needPhysicalShiftState();
        }
        return checkMineStateEffect({ searchParam });
    }
);
