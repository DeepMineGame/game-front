import React, { FC } from 'react';
import { Button, showSuccessModal, useAccountName } from 'shared';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import { useTranslation } from 'react-i18next';
import {
    extractDmeToClaimAttr,
    rolesStore,
    UserRoles,
    moclaim,
    getRolesEffect,
} from 'entities/smartcontract';

export const ClaimDME: FC = () => {
    const waxUser = useAccountName();
    const { t } = useTranslation();

    const roles = useStore(rolesStore);
    const mineOwnerRole = roles?.filter(
        ({ role }) => role === UserRoles.mine_owner
    );
    const dmeToClaim = mineOwnerRole?.length
        ? extractDmeToClaimAttr(mineOwnerRole[0])?.value
        : null;

    const dmeMoreThenZero = Number(dmeToClaim) > 0;
    const claimDme = useSmartContractAction({ action: moclaim({ waxUser }) });
    const onDmeClick = async () => {
        await claimDme();
        await getRolesEffect({ searchParam: waxUser });
        showSuccessModal({
            title: t('components.common.button.claim'),
            content: t('components.common.yourDMEHasBeenClaimed'),
        });
    };

    return (
        <Button type="primary" onClick={onDmeClick} disabled={!dmeMoreThenZero}>
            {t('components.common.button.claim')} {dmeToClaim}{' '}
            {t('components.common.button.dme')}
        </Button>
    );
};
