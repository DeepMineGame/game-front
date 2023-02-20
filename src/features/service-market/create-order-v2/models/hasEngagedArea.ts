import { createStore } from 'effector';
import { getAreaByOwnerEffect } from './effects';

export const hasEngagedAreaStore = createStore<boolean>(false).on(
    getAreaByOwnerEffect.doneData,
    (_, data) => Boolean(data?.rows?.[0]?.engaged)
);
