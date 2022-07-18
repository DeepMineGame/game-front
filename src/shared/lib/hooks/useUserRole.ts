import { RoleDto, UserRoles } from 'entities/smartcontract';

export const useUserRoles = (roles: RoleDto[]) => {
    const roleStatus = roles.reduce(
        (status, { role }) => {
            if (role === UserRoles.landlord) status.isLandlord = true;
            if (role === UserRoles.mine_owner) status.isMineOwner = true;
            if (role === UserRoles.citizen) status.isCitizen = true;
            if (role === UserRoles.contractor) status.isContractor = true;

            return status;
        },
        {
            isLandlord: false,
            isMineOwner: false,
            isCitizen: false,
            isContractor: false,
        }
    );

    return roleStatus;
};
