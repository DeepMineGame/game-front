import { createStore } from 'effector';
import { getAreaByOwnerEffect, getMinesByOwnerEffect } from './effects';

export const hasAreaOrMineStore = createStore(false)
    .on(
        getMinesByOwnerEffect.doneData,
        (hasAreaOrMine, rows) => Boolean(rows?.length) || hasAreaOrMine
    )
    .on(
        getAreaByOwnerEffect.doneData,
        (hasAreaOrMine, rows) => Boolean(rows?.length) || hasAreaOrMine
    );
