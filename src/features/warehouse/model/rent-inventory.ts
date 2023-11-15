import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { RentAssetTableSearchType } from 'entities/smartcontract';
import { getRentInventory } from 'entities/rent-market-api';
import { AssetStruct } from 'entities/game-stat';

export const RentInventoryGate = createGate<{
    searchParam: string;
    searchType?: RentAssetTableSearchType;
}>('RentInventoryGate');

export const getRentAssetsEffect = createEffect(getRentInventory);
export const $rentInventory = createStore<AssetStruct[]>([]).on(
    getRentAssetsEffect.doneData,
    (data, payload) => payload
);

forward({ from: RentInventoryGate.open, to: getRentAssetsEffect });
