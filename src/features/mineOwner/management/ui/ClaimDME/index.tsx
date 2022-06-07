import React, { FC } from 'react';
import { Button } from 'shared';
import { useStore } from 'effector-react';
import {
    extractDmeToClaimAttr,
    rolesStore,
    UserRoles,
} from 'entities/smartcontract';

export const ClaimDME: FC = () => {
    const roles = useStore(rolesStore);
    const mineOwnerRole = roles?.filter(
        ({ role }) => role === UserRoles.mine_owner
    );
    const dmeToClaimAttr = mineOwnerRole?.length
        ? extractDmeToClaimAttr(mineOwnerRole[0])
        : null;

    const dmeToClaim = dmeToClaimAttr?.value;

    return dmeToClaim ? (
        <Button type="primary">Claim {dmeToClaim} DME</Button>
    ) : null;
};
