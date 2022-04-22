import { createEvent, createStore } from 'effector';

import { fetchUserFromDeepMineBackendEffect } from 'features';
import { User } from './type';

export const clearUserStoreEvent = createEvent('clearUserStore');

export const userStore = createStore<User | null>(null)
    .on(fetchUserFromDeepMineBackendEffect.doneData, (_, user) => user)
    .reset(clearUserStoreEvent);
