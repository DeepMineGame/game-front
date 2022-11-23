export enum ActionState {
    undefined,
    active,
    interrupted,
    finished,
    claimed,
    idle,
}

export enum ActionType {
    undefined,
    physical_shift,
    mine_setup,
    mine,
    mine_activation,
    mine_deactivation,
    mine_unsetup,
    mine_change_layer_depth,
    engineer_open_skill,
    engineer_upgrade_item,
    engineer_level_up,
    equipment_repair,
}

export type ActionDto<TAttrs extends any = any> = {
    contract_id: number;
    finishes_at: number;
    id: number;
    owner_user_id: string;
    attrs: TAttrs[];
    state: ActionState;
    type: ActionType;
};
