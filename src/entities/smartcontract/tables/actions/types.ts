export enum ActionState {
    undefined,
    active,
    interrupted,
    finished,
    claimed,
}
export enum ActionType {
    undefined,
    physical_shift,
    mine_setup,
    mine,
    mine_activation,
    mine_deactivation,
    mine_unsetup,
}
export type ActionDto = {
    contract_id: number;
    finishes_at: number;
    id: number;
    owner_user_id: string;
    attrs: { key: string; value: number }[];
    state: ActionState;
    type: ActionType;
};
