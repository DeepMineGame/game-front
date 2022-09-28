import { LOCATION_TO_ID } from './constants';

export type UserDto = {
    owner: string;
    location: LOCATION_TO_ID;
    weight: number;
    stamina: number;
    experience: number;
    level: number;
};
