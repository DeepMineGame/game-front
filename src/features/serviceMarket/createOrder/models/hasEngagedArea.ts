import { createStore } from 'effector';
import { AreasDto } from 'entities/smartcontract';
import { getAreaByOwnerEffect } from './effects';

export const hasEngagedAreaStore = createStore<boolean>(false).on(
    getAreaByOwnerEffect.doneData,
    (hasAreaOrMine, { rows }: { rows?: AreasDto[] }) =>
        Boolean(rows?.[0]?.engaged)
);
