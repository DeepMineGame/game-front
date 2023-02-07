import {
    createEffect,
    createEvent,
    createStore,
    forward,
    sample,
} from 'effector';
import { createGate } from 'effector-react';

export const StaterPackGate = createGate<{
    forwardFromOnboarding?: boolean;
}>('StaterPackGate');

export const toggleStarterPackModalVisibilityEvent = createEvent();

const removeForwardFromOnboardingFlagFromLocalStorage = createEffect(() => {
    sessionStorage.removeItem('forwardFromOnboarding');
});

export const $isStarterPackModalVisible = createStore(false).on(
    toggleStarterPackModalVisibilityEvent,
    (state) => !state
);

sample({
    source: StaterPackGate.open,
    target: toggleStarterPackModalVisibilityEvent,
    filter: ({ forwardFromOnboarding }) => Boolean(forwardFromOnboarding),
});

forward({
    from: StaterPackGate.open,
    to: removeForwardFromOnboardingFlagFromLocalStorage,
});
