export enum AreaRarity {
    rockFields,
    spaceDebris,
    glaciers,
    lava,
    dmeSprings,
}

export enum SlotStatus {
    unreserved,
    reserved,
}

export type MineSlots = {
    reserved: SlotStatus;
    mine_id: number;
    available_from: number;
}[];

const layerDepths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type LayerDepth = typeof layerDepths[number];

export type AreasDto = {
    id: string;
    engaged: 0 | 1;
    init_id: number;
    fee_to_claim: number;
    initialized: boolean;
    rarity: AreaRarity;
    owner: string;
    mine_slots: MineSlots;
} & Record<
    `layer_${LayerDepth}`,
    { amount_capacity: string; current_amount: string; returned_dme: number }
>;
