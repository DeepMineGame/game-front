import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useGate, useStore } from 'effector-react';

import { getDmeAmount, KeyValueTable, useAccountName } from 'shared';
import {
    extractFeeToClaimAttr,
    rolesStore,
    UserRoles,
} from 'entities/smartcontract';
import commonStyles from '../../styles/styles.module.scss';
import { ClaimDmeGate, minesForAreaSlots } from '../../../areaManagement';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const LandStats: FC<Props> = ({ className }) => {
    const accountName = useAccountName();
    useGate(ClaimDmeGate, { searchParam: accountName });

    const { t } = useTranslation();
    const roles = useStore(rolesStore);

    const mines = useStore(minesForAreaSlots);

    const landlordRole = roles?.filter(
        ({ role }) => role === UserRoles.landlord
    );
    const dmeToClaim = landlordRole?.length
        ? getDmeAmount(extractFeeToClaimAttr(landlordRole[0]))
        : 0;

    return (
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.landStats')}
            </div>
            <KeyValueTable
                className={styles.table}
                items={{
                    [t('pages.landLord.cabin.DMEToClaim')]: dmeToClaim,
                    [t('pages.landLord.cabin.mines')]: mines?.length ?? 0,
                }}
            />
        </div>
    );
};
