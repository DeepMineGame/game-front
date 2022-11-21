import { createStore } from 'effector';
import { getAreaByOwnerEffect, getMinesByOwnerEffect } from './effects';

export const hasAreaOrMineStore = createStore<boolean>(false)
    .on(
        getMinesByOwnerEffect.doneData,
        (hasAreaOrMine, data) => Boolean(data?.rows?.length) || hasAreaOrMine
    )
    .on(
        getAreaByOwnerEffect.doneData,
        (hasAreaOrMine, data) => Boolean(data?.rows?.length) || hasAreaOrMine
    );
