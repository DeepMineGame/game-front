import axios from 'axios';
import { ENDPOINT } from 'app/constants';

export type MineStat = {
    action_state: 'active' | 'interrupted' | 'finished' | 'claimed' | 'idle';
    mining_result: 'success' | 'mining' | 'interrupted';
    mine_state:
        | 'setuped'
        | 'activated'
        | 'deactivated'
        | 'unsetuped'
        | 'abandoned'
        | 'depth_changing';
    mine_depth: string;
    mine_id: string;
    mine_owner: string;
    mining_in_progress: boolean;
    mining_seconds_left: number;
};

export const getMiningStat = async ({
    accountName,
}: {
    accountName: string;
}) => {
    const { data } = await axios.get<{ user: string }, { data: MineStat }>(
        `${ENDPOINT}/statistic/mining`,
        {
            params: {
                user: accountName,
            },
        }
    );
    return data;
};
