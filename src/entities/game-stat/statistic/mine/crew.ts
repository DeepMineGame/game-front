import axios from 'axios';
import { ENDPOINT } from 'app/constants';

export type MineCrewDto = {
    mine_id: number;
    counters: {
        total: number;
        locked: number;
        available: number;
        in_progress: number;
        occupied: number;
    };
    in_progress: [
        {
            contract_id: number;
            self_sign_available: boolean;
            create_time: number;
        }
    ];
    occupied: [
        {
            contract_id: number;
            contractor: string;
            status: number;
            paid_fee: string;
            autorenewal_enabled: true;
        },
        {
            contract_id: number;
            contractor: string;
            status: number;
            paid_fee: string;
            autorenewal_enabled: false;
        },
        {
            contract_id: number;
            contractor: string;
            status: number;
            paid_fee: string;
            autorenewal_enabled: true;
        }
    ];
};

export const getMineCrew = async ({ mineOwner }: { mineOwner: string }) => {
    const { data } = await axios.get<MineCrewDto>(
        `${ENDPOINT}/statistic/mine/crew`,
        {
            params: {
                mine_owner: mineOwner,
            },
        }
    );

    return data;
};
