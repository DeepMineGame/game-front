export enum MineState {
    undefined,
    activated,
    deactivated,
}

export type MineDto = {
    asset_id: number;
    area_id: string;
    layer_depth: number;
    level: number;
    sub_level: number;
    state: MineState;
    id: number;
    contractor_slots: string[];
};
