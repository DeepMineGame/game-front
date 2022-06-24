export enum MineState {
    undefined,
    setuped,
    activated,
    deactivated,
    unsetuped,
}

export type MineDto = {
    asset_id: number;
    area_id: string;
    layer_depth: number;
    level: number;
    sub_level: number;
    owner: string;
    state: MineState;
    id: number;
    contractor_slots: { reserved: number; contractor: string }[];
};
