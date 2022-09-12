import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import { getActions, UserActionDto } from 'entities/gameStat';
import { getRolesEffect } from 'entities/smartcontract';

export const UserActionTableGage = createGate<{
    searchParam: string;
}>('UserActionTableGage');

export const getUserAction = createEffect(getActions);

forward({
    from: UserActionTableGage.open,
    to: [getUserAction, getRolesEffect],
});

export const actionsStore = createStore<UserActionDto[]>([]).on(
    getUserAction.doneData,
    (_, actions) => actions
);
