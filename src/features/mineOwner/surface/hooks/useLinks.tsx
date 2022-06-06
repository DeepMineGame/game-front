import { useTranslation } from 'react-i18next';
import { Button, desktopS, useMediaQuery } from 'shared';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { wipPage } from 'app/router/paths';
import { ATOMICHUB_URL } from 'app';
import { mineOwnerCabinState } from '../../models/mineOwnerState';

export function useLinks() {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const navigate = useNavigate();
    const navigateToWipPageWithTittle = (title: string) => () =>
        navigate(wipPage, { state: { title } });

    return {
        [mineOwnerCabinState.isOutsideFromLocation]: null,
        [mineOwnerCabinState.initial]: (
            <div>
                <Button
                    type="link"
                    onClick={navigateToWipPageWithTittle('Storage')}
                >
                    {isDesktop
                        ? t('features.mineOwner.pickUpFromStorage')
                        : t('features.mineOwner.storage')}
                </Button>
                <Button
                    type="link"
                    onClick={() => window.open(ATOMICHUB_URL, '_blank')}
                >
                    {isDesktop
                        ? t('features.mineOwner.goToMarket')
                        : t('features.mineOwner.market')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.hasNoMineNft]: (
            <div>
                <Button
                    type="link"
                    onClick={navigateToWipPageWithTittle('Storage')}
                >
                    {isDesktop
                        ? t('features.mineOwner.pickUpFromStorage')
                        : t('features.mineOwner.storage')}
                </Button>
                <Button
                    type="link"
                    onClick={() => window.open(ATOMICHUB_URL, '_blank')}
                >
                    {isDesktop
                        ? t('features.mineOwner.goToMarket')
                        : t('features.mineOwner.market')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.needSignContractWithLandLord]: (
            <div>
                <Button
                    type="link"
                    onClick={navigateToWipPageWithTittle('Contract')}
                >
                    {isDesktop
                        ? t('features.mineOwner.chooseContract')
                        : t('features.mineOwner.choose')}
                </Button>
                <Button type="link" onClick={() => navigate(wipPage)}>
                    {isDesktop
                        ? t('features.mineOwner.createContract')
                        : t('features.mineOwner.create')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.isMineSet]: null,
        [mineOwnerCabinState.contractsFree]: null,
        [mineOwnerCabinState.isMineSetupInProgress]: null,
        [mineOwnerCabinState.isMineActive]: null,
    };
}
