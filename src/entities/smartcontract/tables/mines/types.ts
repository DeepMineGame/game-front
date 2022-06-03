export enum MineState {
    undefined,
    activated,
    deactivated,
}

export type MineDto = {
    asset_id: string;
    area_id: string;
    layer_depth: number;
    level: number;
    sub_level: number;
    state: MineState;
};
