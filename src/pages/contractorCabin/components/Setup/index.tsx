import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

interface SetupProps {
    hasShift?: boolean;
    onMount: () => void;
    onUnmount: () => void;
}
export const Setup = ({ hasShift, onMount, onUnmount }: SetupProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        onMount();

        return () => {
            onUnmount();
        };
    }, []);

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
