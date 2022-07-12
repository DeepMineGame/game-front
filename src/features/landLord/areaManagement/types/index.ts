import { MineState } from 'entities/smartcontract';

export enum Activity {
    'low',
    'average',
    'high',
}

export interface MineCrewDataType {
    discord?: string;
    mine: string;
    status: MineState;
    ejection: number;
    crew: [number, number];
    activity: Activity;
}
