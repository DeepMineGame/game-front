import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

interface SetupProps {
    hasShift?: boolean;
}
export const Setup = ({ hasShift }: SetupProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.setup.title')}
            </div>
            {hasShift ? (
                <div
                    className={cn(
                        contractorStyles.description,
                        styles.descriptionCenter
                    )}
                >
                    {t('pages.contractor.setup.descriptionShort')}
                </div>
            ) : (
                <div
                    className={cn(
                        contractorStyles.description,
                        styles.description
                    )}
                >
                    {t('pages.contractor.setup.description')}
                </div>
            )}
        </div>
    );
};
