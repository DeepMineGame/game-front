import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Button, desktopS, useMediaQuery } from 'shared';
import { useNavigate } from 'react-router-dom';
import { warehouse } from 'app/router/paths';
import { ATOMICHUB_URL } from 'app';
import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const NoArea: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const navigate = useNavigate();

    return (
        <div className={cn(styles.noArea, className)}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.noAreaTitle')}
            </div>
            {isDesktop && (
                <div
                    className={cn(commonStyles.description, styles.description)}
                >
                    {t('pages.landLord.cabin.noAreaDescription')}
                </div>
            )}
            <div className={styles.buttons}>
                <Button
                    type="primary"
                    ghost
                    onClick={() => navigate(warehouse)}
                >
                    {isDesktop
                        ? t('pages.landLord.cabin.pickUp')
                        : t('pages.landLord.cabin.storage')}
                </Button>
                <Button
                    type="primary"
                    ghost
                    onClick={() => window.open(ATOMICHUB_URL, '_blank')}
                >
                    {isDesktop
                        ? t('pages.landLord.cabin.goToMarket')
                        : t('pages.landLord.cabin.market')}
                </Button>
            </div>
        </div>
    );
};
