import { useTranslation } from 'react-i18next';
import React from 'react';
import { MineStat } from '../ui/components/mineStat';
import { mineOwnerCabinState } from '../../models';

export function useDescriptions() {
    const { t } = useTranslation();

    return {
        [mineOwnerCabinState.initial]: t('features.mineOwner.needMineCard'),
        [mineOwnerCabinState.needPhysicalShift]: t(
            'features.mineOwner.needShift'
        ),
        [mineOwnerCabinState.needContractWithLandlord]: t(
            'features.mineOwner.needLandLord'
        ),
        [mineOwnerCabinState.needSetupMine]: t(
            'features.mineOwner.needSetupMine'
        ),
        [mineOwnerCabinState.mineIsDepthChanging]: t(
            'features.mineOwner.depthChangingText'
        ),
        [mineOwnerCabinState.needMineNft]: t('features.mineOwner.needMineCard'),
        [mineOwnerCabinState.needActivateMine]: t(
            'features.mineOwner.mineManagementDescription'
        ),
        [mineOwnerCabinState.needCrew]: t(
            'features.mineOwner.needTeamDescription'
        ),
        [mineOwnerCabinState.everythingIsDone]: <MineStat />,
        [mineOwnerCabinState.contractWithLandlordWasTerminated]: t(
            'features.mineOwner.mineNotInArea'
        ),
    };
}
