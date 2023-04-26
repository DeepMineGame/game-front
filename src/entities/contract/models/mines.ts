import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    getInventoryTableData,
    getMinesEffect,
    mineAssetTemplateId,
    MineDto,
    searchBy,
    UserInventoryType,
} from 'entities/smartcontract';

const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);

export const MinesGate = createGate<{ searchParam: string }>('MinesGate');

export const minesStore = createStore<MineDto[]>([]).on(
    getMinesByOwnerEffect.doneData,
    (_, data) => data?.rows
);

const getInventory = createEffect<
    { searchParam: string },
    { rows: UserInventoryType[] } | undefined
>(getInventoryTableData);

forward({
    from: MinesGate.open,
    to: [getMinesByOwnerEffect, getInventory],
});

export const $isActiveInventoryHasMineAsset = createStore(false).on(
    getInventory.doneData,
    (_, invetories) =>
        Boolean(
            invetories?.rows.find(({ template_id }) =>
                mineAssetTemplateId.includes(template_id)
            )
        )
);

export const $mineInActiveInventory = createStore<UserInventoryType[]>([]).on(
    getInventory.doneData,
    (_, invetories) =>
        invetories?.rows.filter(({ template_id }) =>
            mineAssetTemplateId.includes(template_id)
        )
);
