import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from 'shared/ui/icons';
import styles from './index.module.scss';

export const BackButton = () => {
    const { t } = useTranslation();

    return (
        <div className={cn(styles.button)}>
            <ArrowLeftIcon />
            <div>{t('kit.Back')}</div>
        </div>
    );
};
