import {
    createEffect,
    createStore,
    forward,
    createEvent,
    sample,
} from 'effector';
import { createGate } from 'effector-react';
import { getMiningStat, MineStat } from 'entities/game-stat';

let accountName: { accountName: string };
export const getMiningEffect = createEffect(
    (account: { accountName: string }) => {
        accountName = account;
        return getMiningStat(account);
    }
);

export const $miningStat = createStore<MineStat | null>(null).on(
    getMiningEffect.doneData,
    (_, payload) => payload
);
export const MiningStatGate = createGate<{ accountName: string }>(
    'MineStatGate'
);

forward({
    from: MiningStatGate.open,
    to: getMiningEffect,
});

export const setMiningCountDownEvent = createEvent<number>();

export const $miningCountDown = createStore(0).on(
    setMiningCountDownEvent,
    (_, payload) => payload
);

sample({
    source: $miningStat,
    target: setMiningCountDownEvent,
    fn: (miningStat) => miningStat?.mining_seconds_left || 0,
});

$miningCountDown.subscribe((miningCountDown) => {
    setTimeout(() => {
        if (miningCountDown > 0) {
            setMiningCountDownEvent(miningCountDown - 1);
        }
    }, 1000);
});

// refetch on window focus to correct timer display
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        getMiningEffect(accountName);
    }
});
