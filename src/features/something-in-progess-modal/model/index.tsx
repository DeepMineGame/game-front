import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const setSomethingCountDownEvent = createEvent<number | null>();
export const setInProgressThingName = createEvent<null | string>();
export const setInProgressThingFinishCallback = createEvent<Function | null>();

export const $thingInProgressName = createStore<null | string>(
    'Synchronization'
).on(setInProgressThingName, (state, payload) => payload);

export const $somethingInProgressCountDown = createStore<number | null>(
    null
).on(setSomethingCountDownEvent, (_, payload) => payload);

export const $thingInProgressCallback = createStore<Function | null>(null).on(
    setInProgressThingFinishCallback,
    (state, payload) => payload
);
$somethingInProgressCountDown.subscribe((miningCountDown) => {
    setTimeout(() => {
        if (typeof miningCountDown === 'number' && miningCountDown > 0) {
            setSomethingCountDownEvent(Number(miningCountDown) - 1);
        }
    }, 1000);
});

persist({
    store: $somethingInProgressCountDown,
    key: '$somethingInProgressCountDown',
});
