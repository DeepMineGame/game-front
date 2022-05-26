import React, { FC } from 'react';
import { Button, desktopS, Title, useMediaQuery } from 'shared';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const Surface: FC = () => {
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();

    return (
        <div className={styles.surface}>
            {isDesktop && <Title fontFamily="bai">Welcome, Citizen</Title>}
            {isDesktop
                ? t('features.mineOwner.needMineCardDesktop')
                : t('features.mineOwner.needMineCardMobile')}
            <div>
                <Button type="link">
                    {isDesktop
                        ? t('features.mineOwner.pickUpFromStorage')
                        : t('features.mineOwner.storage')}
                </Button>
                <Button type="link">
                    {isDesktop
                        ? t('features.mineOwner.goToMarket')
                        : t('features.mineOwner.market')}
                </Button>
            </div>
        </div>
    );
};
