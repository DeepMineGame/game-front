import React, { FC } from 'react';
import {
    Button,
    desktopS,
    Title,
    useChainAuthContext,
    useMediaQuery,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    $mineOwnerCabinState,
    MineOwnerCabinGate,
    mineOwnerCabinState,
} from '../../model';
import styles from './styles.module.scss';

export const Surface: FC = () => {
    const chainAccount = useChainAuthContext();

    useGate(MineOwnerCabinGate, {
        searchParam: chainAccount?.activeUser?.accountName || '',
    });

    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();
    const cabinState = useStore($mineOwnerCabinState);

    const titles = {
        [mineOwnerCabinState.initial]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.hasMineNft]: t('features.mineOwner.mineNotSet'),
        [mineOwnerCabinState.isMineActive]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMineSet]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMining]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMineSetupInProgress]: t(
            'features.mineOwner.welcome'
        ),
    };

    return (
        <div className={styles.surface}>
            {isDesktop && <Title fontFamily="bai">{titles[cabinState]}</Title>}
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
