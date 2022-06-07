export enum UserRoles {
    /* [0] */ undefined,
    /* [1] */ citizen,
    /* [2] */ landlord,
    /* [3] */ mine_owner,
    /* [4] */ contractor,
    /* [5] */ scientist,
    /* [6] */ engineer,
    /* [7] */ geologist,
    /* [8] */ factory_owner,
}
export type RoleDto = {
    id: number;
    owner: string;
    role: UserRoles;
    attrs: { key: string; value: string }[];
};
