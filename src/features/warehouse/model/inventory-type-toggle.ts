import { createEvent, createStore, sample } from 'effector';

export enum InventoryTypeRadioButtonValues {
    'active',
    'rent',
}

export const inventoryTypeToggle = createEvent();

export const $inventoryTypeToggleState = createStore(
    InventoryTypeRadioButtonValues.active
).on(inventoryTypeToggle, (state, payload) => payload);
