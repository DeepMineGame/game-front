import { createStore } from 'effector';
import { getAreaByOwnerEffect } from './effects';

export const hasEngagedAreaStore = createStore(false).on(
    getAreaByOwnerEffect.doneData,
    (_, [area]) => Boolean(area?.engaged)
);
