import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const MineIsSet: FC<Props> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.mineIsSetTitle')}
            </div>
            <div className={cn(commonStyles.description, styles.description)}>
                {t('pages.landLord.cabin.mineIsSetDescription')}
            </div>
        </div>
    );
};
