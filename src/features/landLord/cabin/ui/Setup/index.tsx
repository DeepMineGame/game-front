import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const Setup: FC<Props> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.setupTitle')}
            </div>
            <div className={cn(commonStyles.description, styles.description)}>
                {t('pages.landLord.cabin.setupDescription')}
            </div>
        </div>
    );
};
