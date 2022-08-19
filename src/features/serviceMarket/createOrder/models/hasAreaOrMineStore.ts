import { createStore } from 'effector';
import { getAreaByOwnerEffect, getMinesByOwnerEffect } from './effects';

export const hasAreaOrMineStore = createStore<boolean>(false)
    .on(
        getMinesByOwnerEffect.doneData,
        (hasAreaOrMine, { rows }) => rows?.length || hasAreaOrMine
    )
    .on(
        getAreaByOwnerEffect.doneData,
        (hasAreaOrMine, { rows }) => rows?.length || hasAreaOrMine
    );
