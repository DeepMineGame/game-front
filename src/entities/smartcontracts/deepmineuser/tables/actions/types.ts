import { ActionType } from './index';

export enum ActionState {
    undefined,
    active,
    interrupted,
    finished,
}

export type ActionDto = {
    contract_id: number;
    finishes_at: number;
    id: number;
    owner_user_id: string;
    processes: { key: string; value: string }[];
    state: ActionState;
    type: ActionType;
};
