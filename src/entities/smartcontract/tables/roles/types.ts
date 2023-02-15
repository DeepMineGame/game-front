export enum Level {
    first = 1,
    second = 2,
    third = 3,
    fourth = 4,
    fifth = 5,
    sixth = 6,
    seventh = 7,
    eighth = 8,
    ninth = 9,
}

export enum UserRoles {
    undefined,
    citizen,
    landlord,
    mine_owner,
    contractor,
    engineer,
}

export enum RoleState {
    undefined,
    active,
    idle,
}

export type RoleDto = {
    id: number;
    owner: string;
    role: UserRoles;
    attrs: { key: string; value: string }[];
    experience: number;
    level: Level;
    exp_to_level_up: number;
};
