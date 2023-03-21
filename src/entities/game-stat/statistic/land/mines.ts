import axios from 'axios';
import { ENDPOINT } from 'app/constants';

export type MinesOnLand = {
    id: number;
    mine_id: string;
    mine_owner: string;
    mine_owner_discord: string;
    mined_after_ejection: number;
    crew: number;
    status: 1 | 0;
    activity: string;
}[];

export const getMinesOnLand = async ({ id }: { id: number }) => {
    const { data = [] } = await axios.get<MinesOnLand>(
        `${ENDPOINT}/statistic/land/mines`,
        {
            params: {
                id,
            },
        }
    );

    return data;
};
