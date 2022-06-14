import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { KeyValueTable } from 'shared';
import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const LandStats = ({ className }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.landStats')}
            </div>
            <KeyValueTable
                className={styles.table}
                items={{
                    [t('pages.landLord.cabin.DMEToClaim')]: 999999,
                    [t('pages.landLord.cabin.mines')]: 2,
                }}
            />
        </div>
    );
};
