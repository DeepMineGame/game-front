export enum MineStates {
    undefined,
    setuped = 'setuped',
    activated = 'activated',
    deactivated = 'deactivated',
    unsetuped = 'unsetuped',
    abandoned = 'abandoned',
    depth_changing = 'depth_changing',
}
export type MineOwnerManagementData = {
    contract_id: number;
    mine_level: number;
    mine_sublevel: number;
    mine_depth: number;
    mine_state: MineStates;
    dme_to_claim: number;
    fee_in_dme: number;
    dme_to_account: number;
    mine_has_active_contractors_contracts: boolean;
    mine_asset: {
        asset_id: number;
        template_id: number;
        name: string;
        schema_name: string;
        level: number;
        rarity: string;
        type: string;
        class: string;
        description: string;
        broken: boolean;
        in_use: boolean;
        available_from: string;
        dme_mined: string;
        total_dme_mined: string;
        dme_to_upgrade: string;
        depreciation: number;
        current_capacity: number;
        maximal_capacity: number;
        malfunction_probability: number;
        repair_cost: string;
        refurbish_cost: string;
        rent_contract_id: number;
        rent_fee_counter: number;
        rent_fee_percent: number;
        is_repairable: boolean;
        is_refurbishable: boolean;
    };
};
