import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Button, desktopS, useMediaQuery } from 'shared';
import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
    disabled: boolean;
}

export const EngageArea = ({ className, disabled = true }: Props) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);

    return (
        <div className={cn(styles.engageArea, className)}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.engageTitle')}
            </div>
            {isDesktop && (
                <div
                    className={cn(commonStyles.description, styles.description)}
                >
                    {t('pages.landLord.cabin.engageDescription')}
                </div>
            )}
            <Button type="primary" disabled={disabled}>
                {t('pages.landLord.cabin.engageButton')}
            </Button>
        </div>
    );
};
