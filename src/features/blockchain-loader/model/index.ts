import { createEvent, createStore } from 'effector';

export const setBlockchainConnectionUnstable = createEvent<boolean>();

export const $isBlockchainConnectionUnstable = createStore(false).on(
    setBlockchainConnectionUnstable,
    (_, payload) => payload
);
