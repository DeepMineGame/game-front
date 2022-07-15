import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useStore } from 'effector-react';

import { KeyValueTable } from 'shared';
import { contractorsStore } from 'entities/smartcontract';
import commonStyles from '../../styles/styles.module.scss';
import { minesForAreaSlots } from '../../../areaManagement';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const LandStats: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const mines = useStore(minesForAreaSlots);
    const contractors = useStore(contractorsStore);

    return (
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.landStats')}
            </div>
            <KeyValueTable
                className={styles.table}
                items={{
                    [t('pages.landLord.cabin.DMEToClaim')]:
                        contractors?.[0].real_amount_to_claim,
                    [t('pages.landLord.cabin.mines')]: mines?.length ?? 0,
                }}
            />
        </div>
    );
};
