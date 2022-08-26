import { useTranslation } from 'react-i18next';
import { mineOwnerCabinState } from '../../models';

export function useTitles() {
    const { t } = useTranslation();

    return {
        [mineOwnerCabinState.initial]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.needContractWithLandlord]: t(
            'features.mineOwner.mineNotSet'
        ),
        [mineOwnerCabinState.needMineNft]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.needPhysicalShift]: t(
            'features.mineOwner.mineNotSet'
        ),

        [mineOwnerCabinState.needSetupMine]: t('features.mineOwner.mineNotSet'),
        [mineOwnerCabinState.needCrew]: t('features.mineOwner.createTeam'),

        [mineOwnerCabinState.needActivateMine]: t(
            'features.mineOwner.mineManagement'
        ),
        [mineOwnerCabinState.everythingIsDone]: t(
            'features.mineOwner.mineIsActive'
        ),
        [mineOwnerCabinState.contractWithLandlordWasTerminated]: t(
            'features.mineOwner.contractWasTerminated'
        ),
    };
}
