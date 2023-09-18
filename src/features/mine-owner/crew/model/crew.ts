import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getMineCrew, MineCrewDto } from 'entities/game-stat';

export const getMineCrewEffect = createEffect(getMineCrew);
export const $mineCrew = createStore<MineCrewDto | null>(null).on(
    getMineCrewEffect.doneData,
    (_, payload) => payload
);

export const MineCrewGate = createGate<{ mineOwner: string }>('MineCrewGate');

forward({ from: MineCrewGate.open, to: getMineCrewEffect });
