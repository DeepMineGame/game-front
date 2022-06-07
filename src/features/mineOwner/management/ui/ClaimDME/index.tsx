import React, { FC } from 'react';
import { Button, useAccountName } from 'shared';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import {
    extractDmeToClaimAttr,
    rolesStore,
    UserRoles,
    moclaim,
    getRolesEffect,
} from 'entities/smartcontract';

export const ClaimDME: FC = () => {
    const waxUser = useAccountName();
    const roles = useStore(rolesStore);
    const mineOwnerRole = roles?.filter(
        ({ role }) => role === UserRoles.mine_owner
    );
    const dmeToClaimAttr = mineOwnerRole?.length
        ? extractDmeToClaimAttr(mineOwnerRole[0])
        : null;

    const dmeToClaim = dmeToClaimAttr?.value;
    const dmeMoreThenZero = Number(dmeToClaim) > 0;
    const claimDme = useSmartContractAction(moclaim({ waxUser }));
    const onDmeClick = async () => {
        await claimDme();
        await getRolesEffect({ searchParam: waxUser });
    };

    return dmeMoreThenZero ? (
        <Button type="primary" onClick={onDmeClick}>
            Claim {dmeToClaim} DME
        </Button>
    ) : null;
};
