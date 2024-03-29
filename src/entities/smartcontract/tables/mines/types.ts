export enum MineState {
    undefined,
    setuped,
    activated,
    deactivated,
    unsetuped,
    abandoned,
    depth_changing,
}

export type ContractorSlot = { reserved: number; contractor: string };
export type ContractorSlots = ContractorSlot[];

export type MineDto = {
    id: number;
    owner: string;
    area_id: string;
    contract_id: string;
    area_type: string;
    layer_depth: number;
    level: number;
    sublevel: number;
    state: MineState;
    contract_finishes_at: number;
    area_fee_percent: number;
    fee_to_claim: number;
    contractor_slots: ContractorSlots;
};
