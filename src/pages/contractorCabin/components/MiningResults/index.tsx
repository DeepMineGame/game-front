import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const MiningResults = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.lastResults.title')}
            </div>
        </div>
    );
};
