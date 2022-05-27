import { createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
    getInventoriesEffect,
    InventoriesDto,
    inventoriesStore,
    mineAssetTemplateId,
} from 'entities/smartcontract';

export const MineOwnerCabinGate = createGate<{ searchParam: string }>(
    'MineOwnerCabinGate'
);

const hasMineFilter = (data: InventoriesDto[] | null) => {
    return Boolean(
        data?.filter(
            ({ asset_template_id }) => asset_template_id === mineAssetTemplateId
        )[0]
    );
};

export enum mineOwnerCabinState {
    initial,
    isMining,
    hasMineNft,
    isMineSet,
    isMineSetupInProgress,
    isMineActive,
}

export const $mineOwnerCabinState = createStore<mineOwnerCabinState>(
    mineOwnerCabinState.initial
);

forward({
    from: MineOwnerCabinGate.open,
    to: getInventoriesEffect,
});

sample({
    source: inventoriesStore,
    target: $mineOwnerCabinState,
    clock: inventoriesStore,
    filter: hasMineFilter,
    fn: () => mineOwnerCabinState.hasMineNft,
});
