import { KeyValueTable } from 'shared';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { rolesStore, UserRoles } from 'entities/smartcontract';

import { $userMine } from '../../../../models';
import styles from './styles.module.scss';

const IS_FIRST_VISIT_KEY = 'IS_FIRST_VISIT_KEY';
export const MineStat = () => {
    const { t } = useTranslation();
    const [isFirstRender] = useState(
        localStorage.getItem(IS_FIRST_VISIT_KEY) !== 'false'
    );
    const userRoles = useStore(rolesStore);
    const mineOwnerRole = userRoles?.find(
        ({ role }) => role === UserRoles.mine_owner
    );

    const feeToClaim =
        Number(
            mineOwnerRole?.attrs?.find(({ first }) => first === 'fee_to_claim')
                ?.second
        ) || 0;
    const userMine = useStore($userMine);

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
                [t('pages.landLord.cabin.DMEToClaim')]: (
                    <span>
                        {'\u00A0'}
                        {`${feeToClaim / 10 ** 8}`}
                    </span>
                ),
                [t('pages.mining.mineDepth')]: userMine?.layer_depth ?? '-',
            }}
        />
    );
};
