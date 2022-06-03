import { useTranslation } from 'react-i18next';
import { Button, desktopS, useMediaQuery } from 'shared';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { wipPage } from 'app/router/paths';
import { mineOwnerCabinState } from '../../models/mineOwnerState';

export function useLinks() {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const navigate = useNavigate();
    return {
        [mineOwnerCabinState.isOutsideFromLocation]: null,
        [mineOwnerCabinState.initial]: (
            <div>
                <Button
                    type="link"
                    onClick={() =>
                        navigate(wipPage, { state: { title: 'storage' } })
                    }
                >
                    {isDesktop
                        ? t('features.mineOwner.pickUpFromStorage')
                        : t('features.mineOwner.storage')}
                </Button>
                <Button
                    type="link"
                    onClick={() =>
                        navigate(wipPage, { state: { title: 'Market' } })
                    }
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
                    onClick={() =>
                        navigate(wipPage, { state: { title: 'Storage' } })
                    }
                >
                    {isDesktop
                        ? t('features.mineOwner.pickUpFromStorage')
                        : t('features.mineOwner.storage')}
                </Button>
                <Button
                    type="link"
                    onClick={() =>
                        navigate(wipPage, { state: { title: 'Market' } })
                    }
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
                    onClick={() =>
                        navigate(wipPage, { state: { title: 'Contract' } })
                    }
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
