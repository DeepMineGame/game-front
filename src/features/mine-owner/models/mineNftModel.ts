import { createEffect, createStore, forward } from 'effector';
import { AssetDataType, getAssets } from 'entities/atomicassets';
import { MineDto } from 'entities/smartcontract';
import { $userMine } from './currentMine';

const getMineAsset = createEffect((mine: MineDto | null) =>
    getAssets(mine?.id)
);

export const $mineNft = createStore<AssetDataType | undefined | null>(null).on(
    getMineAsset.doneData,
    (_, data) => data
);

forward({
    from: $userMine,
    to: getMineAsset,
});
