export enum MineState {
    undefined,
    setuped,
    activated,
    deactivated,
    unsetuped,
    abandoned,
}

export type ContractorSlots = { reserved: number; contractor: string }[];

export type MineDto = {
    id: number;
    owner: string;
    area_id: string;
    contract_id: string;
    area_type: string;
    layer_depth: number;
    level: number;
    sub_level: number;
    state: MineState;
    contract_finishes_at: number;
    area_fee_percent: number;
    fee_to_claim: number;
    contractor_slots: ContractorSlots;
};
