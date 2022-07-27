import { RarityType } from '../inventories';

export type ContractorDto = {
    owner: string;
    area_id: string;
    mine_id: string;
    layer_depth: number;
    dme_fullness_percent: string;
    reserved_amount: number;
    real_amount_to_claim: number;
    mining_finish_time: number;
    mining_in_pr: number;
    starts_at: number;
    finishes_at: number;
    params: {
        mineowner: string;
        est_time_min: number;
        est_time_max: number;
        fee_percent: number;
        fee_daily_min_amount: number;
        area_rarity: number;
        layer_depth: number;
        mine_level: number;
        mine_sublevel: number;
        dme_fullness_percent: string;
        reserved_amount: number;
        amount_to_claim: number;
    };
    equip_slots: {
        asset_id: string;
        equip_type: number;
        level: number;
        rarity: RarityType;
        equip_time: number;
    }[];
};
