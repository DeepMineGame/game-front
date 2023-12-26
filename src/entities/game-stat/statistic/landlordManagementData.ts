export type LandlordManagementData = {
    area_total_slots: number;
    area_reserved_slots: number;
    area_active_slots: number;
    area_available_slots: number;
    area_engaged: true;
    dme_to_claim: number;
    area_asset: {
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
        is_repairable: boolean;
        is_refurbishable: boolean;
    };
    area_slots: [
        {
            contract_id: number;
            mine: {
                mine_id: number;
                mine_owner: string;
                mined_after_ejection: string;
                current_crew: number;
                max_crew: number;
                state: string;
                activity: string;
            };
        }
    ];
};
