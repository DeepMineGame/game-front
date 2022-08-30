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
};
