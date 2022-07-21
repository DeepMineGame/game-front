import { KeyValueTable } from 'shared';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { rolesStore, UserRoles } from 'entities/smartcontract';

import { userMineStore } from '../../../../models';
import styles from './styles.module.scss';

const IS_FIRST_VISIT_KEY = 'IS_FIRST_VISIT_KEY';
export const MineStat = () => {
    const { t } = useTranslation();
    const [isFirstRender] = useState(!localStorage.getItem(IS_FIRST_VISIT_KEY));
    const userRoles = useStore(rolesStore);
    const mineOwnerRole = userRoles?.filter(
        ({ role }) => role === UserRoles.mine_owner
    )?.[0];
    const feeToClaim = mineOwnerRole?.attrs?.find(
        ({ key }) => key === 'fee_to_claim'
    );
    const userMine = useStore(userMineStore);
    useEffect(() => {
        if (isFirstRender) {
            localStorage.setItem(IS_FIRST_VISIT_KEY, 'false');
        }
    }, [isFirstRender]);

    return isFirstRender ? (
        <div>{t('features.mineOwner.mineIsActiveDescription')}</div>
    ) : (
        <KeyValueTable
            className={styles.table}
            items={{
                'DME to claim': feeToClaim?.value,
                'Mine depth': userMine?.[0]?.layer_depth,
            }}
        />
    );
};
