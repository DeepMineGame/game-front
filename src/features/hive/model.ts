import { createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    getSmartContractUserEffect,
    LOCATION_TO_ID,
    smartContractUserStore,
} from 'entities/smartcontract';

export const isUserInHive = createStore(false).on(
    smartContractUserStore,
    (_, users) => users?.[0]?.location === LOCATION_TO_ID.hive
);

export const HiveGate = createGate<{ searchParam: string }>('HiveGate');

forward({ from: HiveGate.open, to: getSmartContractUserEffect });
