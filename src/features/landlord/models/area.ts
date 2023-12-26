import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { forward } from 'effector/compat';
import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { LandlordManagementData } from 'entities/game-stat';

const getLandlordManagementData = createEffect(
    async ({ user }: { user: string }) => {
        const { data = null } = await axios.get<LandlordManagementData | null>(
            `${ENDPOINT}/game-api/statistic/landlord/management`,
            {
                params: {
                    user,
                },
            }
        );

        return data;
    }
);

export const $landLordManagementData =
    createStore<LandlordManagementData | null>(null).on(
        getLandlordManagementData.doneData,
        (_, data) => data
    );

export const LandLordManagementData = createGate<{ user: string }>(
    'LandLordManagementData'
);

forward({ from: LandLordManagementData.open, to: getLandlordManagementData });
