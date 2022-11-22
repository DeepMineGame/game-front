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

export const actionMap = {
    [ActionType.undefined]: null,
    [ActionType.physical_shift]: 'Physical shift',
    [ActionType.mine_setup]: 'Mine setup',
    [ActionType.mine]: 'Mine',
    [ActionType.mine_activation]: 'Mine activation',
    [ActionType.mine_deactivation]: 'Mine deactivation',
    [ActionType.mine_unsetup]: 'Mine unsetup',
    [ActionType.mine_change_layer_depth]: 'Mine change layer depth',
    [ActionType.engineer_open_skill]: 'Engineer open skill',
    [ActionType.engineer_upgrade_item]: 'Upgrade in progress',
    [ActionType.engineer_level_up]: 'Engineer level up',
    [ActionType.equipment_repair]: 'Engineer level up',
};

export type ActionDto<TAttrs extends any = any> = {
    contract_id: number;
    finishes_at: number;
    id: number;
    owner_user_id: string;
    attrs: TAttrs[];
    state: ActionState;
    type: ActionType;
};
