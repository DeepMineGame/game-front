import { createEvent, createStore } from 'effector';

import { authDeepMineUserEffect } from 'features';
import { User } from './type';

export const clearUserStoreEvent = createEvent('clearUserStore');

export const userStore = createStore<User | null>(null)
    .on(authDeepMineUserEffect.doneData, (_, user) => user)
    .reset(clearUserStoreEvent);

export const userStoreError = createStore<Error | null>(null)
    .on(authDeepMineUserEffect.failData, (_, error) => error)
    .reset(clearUserStoreEvent);
