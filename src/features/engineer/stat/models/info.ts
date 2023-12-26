import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { forward } from 'effector/compat';
import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { EngineerInfo, EngineerStatDto } from 'entities/engineer';

const getEngineerInfo = createEffect(async ({ user }: { user: string }) => {
    const { data = null } = await axios.get<EngineerInfo | null>(
        `${ENDPOINT}/game-api/statistic/engineer/my_info`,
        {
            params: {
                user,
            },
        }
    );

    return data;
});
const getEngineerStat = createEffect(async ({ user }: { user: string }) => {
    const { data = null } = await axios.get<EngineerStatDto[] | null>(
        `${ENDPOINT}/game-api/statistic/engineer/my_stats`,
        {
            params: {
                user,
            },
        }
    );

    return data;
});

export const $engineerInfo = createStore<EngineerInfo | null>(null).on(
    getEngineerInfo.doneData,
    (_, data) => data
);
export const $engineerStat = createStore<EngineerStatDto[] | null>(null).on(
    getEngineerStat.doneData,
    (_, data) => data
);

export const EngineerStatInfo = createGate<{ user: string }>(
    'EngineerStatInfo'
);

forward({
    from: EngineerStatInfo.open,
    to: [getEngineerInfo, getEngineerStat],
});
