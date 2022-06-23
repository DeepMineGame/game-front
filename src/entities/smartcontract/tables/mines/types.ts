export enum MineState {
    /* [0] */ undefined,
    /* [1] */ setuped,
    /* [2] */ activated,
    /* [3] */ deactivated,
    /* [4] */ unsetuped,
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
