import { createEvent, createStore } from 'effector';

export const setIsPressedMyContracts = createEvent();
export const $isPressedMyContracts = createStore<boolean>(false).on(
    setIsPressedMyContracts,
    (state) => !state
);
