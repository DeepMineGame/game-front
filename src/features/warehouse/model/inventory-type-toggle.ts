import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { filterStore } from '../../service-market';

export enum InventoryTypeRadioButtonValues {
    'active',
    'rent',
}

export const inventoryTypeToggle = createEvent();

export const $inventoryTypeToggleState = createStore(
    InventoryTypeRadioButtonValues.active
).on(inventoryTypeToggle, (state, payload) => payload);

persist({
    store: $inventoryTypeToggleState,
    key: '$inventoryTypeToggleState',
});
