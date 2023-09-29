import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const setSomethingCountDownEvent = createEvent<number>();
export const setInProgressThingName = createEvent<null | string>();
export const $thingInProgressName = createStore<null | string>(
    'Synchronization'
).on(setInProgressThingName, (state, payload) => payload);

export const $somethingInProgressCountDown = createStore(0).on(
    setSomethingCountDownEvent,
    (_, payload) => payload
);
$somethingInProgressCountDown.subscribe((miningCountDown) => {
    setTimeout(() => {
        if (miningCountDown > 0) {
            setSomethingCountDownEvent(miningCountDown - 1);
        }
    }, 1000);
});

persist({
    store: $somethingInProgressCountDown,
    key: '$somethingInProgressCountDown',
});
