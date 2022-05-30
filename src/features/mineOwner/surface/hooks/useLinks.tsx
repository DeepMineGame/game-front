import { useTranslation } from 'react-i18next';
import { Button, desktopS, useMediaQuery } from 'shared';
import React from 'react';
import { mineOwnerCabinState } from '../../model';

export function useLinks() {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    return {
        [mineOwnerCabinState.initial]: (
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
        ),
        [mineOwnerCabinState.isOutsideFromLocation]: null,
        [mineOwnerCabinState.hasMineNft]: null,
        [mineOwnerCabinState.needSignContractWithLandLord]: (
            <div>
                <Button type="link">
                    {isDesktop
                        ? t('features.mineOwner.chooseContract')
                        : t('features.mineOwner.choose')}
                </Button>
                <Button type="link">
                    {isDesktop
                        ? t('features.mineOwner.createContract')
                        : t('features.mineOwner.create')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.isMineActive]: null,
        [mineOwnerCabinState.isMineSet]: null,
        [mineOwnerCabinState.isMining]: null,
        [mineOwnerCabinState.isMineSetupInProgress]: null,
    };
}
