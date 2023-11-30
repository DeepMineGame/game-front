import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { NumericMalfunctionProbability } from '../../../smartcontract';

export enum AssetStructType {
    Areas = 'Areas',
    Equipment = 'Equipment',
    Structures = 'Structures',
    Badges = 'Badges',
    Schemas = 'Schemas',
    'Upgrade kit' = 'Upgrade kit',
}
export type AssetStruct = {
    asset_id: number;
    template_id: number;
    name: string;
    schema_name: string;
    level: number;
    rarity: string;
    type: AssetStructType;
    class: string;
    description: string;
    broken: boolean;
    dme_mined: number;
    total_dme_mined: string;
    dme_to_upgrade: number;
    depreciation: number;
    current_capacity: number;
    maximal_capacity: number;
    rent_contract_id: number;
    in_use: boolean;
    available_from: number;
    malfunction_probability: NumericMalfunctionProbability;
    repair_cost: number;
    refurbish_cost: number;
    is_repairable: boolean;
    is_refurbishable: boolean;
};
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
    est_mining_power_min: number;
    est_mining_power_max: number;
    finished: boolean;
    contract_id: number;
    time_spent: number;
    dme_to_claim: number;
    fee_in_dme: number;
    dme_to_account: number;
    est_time_min: number;
    est_time_max: number;
    rent_fee_counter?: number;
    assets: AssetStruct[];
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
