import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const SignContract = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.signingContract.title')}
            </div>
            <div
                className={cn(contractorStyles.description, styles.description)}
            >
                {t('pages.contractor.signingContract.description')}
            </div>
            <div className={styles.buttons}>
                <div
                    className={cn(contractorStyles.coloredText, styles.button)}
                >
                    {t('pages.contractor.signingContract.findButton')}
                </div>
                <div
                    className={cn(contractorStyles.coloredText, styles.button)}
                >
                    {t('pages.contractor.signingContract.createButton')}
                </div>
            </div>
        </div>
    );
};
