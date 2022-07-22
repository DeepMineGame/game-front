import { RarityType } from '../inventories';

export type ContractorDto = {
    owner: string;
    area_id: string;
    mine_id: string;
    layer_depth: number;
    dme_fullness_percent: string;
    reserved_amount: number;
    real_mined_amount: number;
    time_spent: number;
    real_amount_to_claim: number;
    mining_finish_time: number;
    mining_in_pr: number;
    equip_slots: {
        asset_id: string;
        equip_type: number;
        level: number;
        rarity: RarityType;
        equip_time: number;
    }[];
};
