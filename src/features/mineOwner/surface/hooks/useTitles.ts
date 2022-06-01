import { useTranslation } from 'react-i18next';
import { mineOwnerCabinState } from '../../model';

export function useTitles() {
    const { t } = useTranslation();

    return {
        [mineOwnerCabinState.initial]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.hasNoMineNft]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isOutsideFromLocation]: t(
            'features.mineOwner.mineNotSet'
        ),
        [mineOwnerCabinState.needSignContractWithLandLord]: t(
            'features.mineOwner.mineNotSet'
        ),

        [mineOwnerCabinState.isMineSet]: t('features.mineOwner.mineManagement'),
        [mineOwnerCabinState.isMineSetupInProgress]: t(
            'features.mineOwner.progress'
        ),
        [mineOwnerCabinState.contractsFree]: t(
            'features.mineOwner.needTeamTitle'
        ),
        [mineOwnerCabinState.isMineActive]: t(
            'features.mineOwner.mineIsActive'
        ),
    };
}
