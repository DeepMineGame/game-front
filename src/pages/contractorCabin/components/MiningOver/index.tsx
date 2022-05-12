import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { OkGreenIcon } from 'shared';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const MiningOver = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                <OkGreenIcon />
                <div>{t('pages.contractor.miningOver.title')}</div>
            </div>
            <div
                className={cn(contractorStyles.description, styles.description)}
            >
                {t('pages.contractor.miningOver.description')}
            </div>
        </div>
    );
};
