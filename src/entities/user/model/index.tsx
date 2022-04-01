import {createEvent, createStore} from "effector";

export type User = {
    isMining: boolean
}

export const userStore = createStore<User>({isMining: false});

export const toggleMining = createEvent('toggleMining');

userStore.on(toggleMining, (state) => ({...state, isMining: !state?.isMining}));