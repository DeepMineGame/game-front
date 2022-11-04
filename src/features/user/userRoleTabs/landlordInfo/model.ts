import { createEvent, createStore, sample } from 'effector';
import {
    getAreasEffect,
    $inventory,
    InventoryType,
    UserInventoryType,
} from 'entities/smartcontract';

const setAreaNftEvent = createEvent<UserInventoryType[] | null>(
    'setAreaNftEvent'
);

export const areaNftStore = createStore<UserInventoryType[] | null>(null).on(
    setAreaNftEvent,
    (_, areaNft) => areaNft
);

// filters inventory items by area and set it in areaNftStore
sample({
    source: $inventory,
    target: setAreaNftEvent,
    filter: (inventory) =>
        Boolean(
            inventory?.filter(
                ({ inv_type }) => inv_type === InventoryType.areas
            )[0]
        ),
});

// fetch areas from table by nft id
sample({
    source: areaNftStore,
    target: getAreasEffect,
    fn: (areaNft) => ({ searchParam: areaNft?.[0]?.asset_id || '' }),
});
