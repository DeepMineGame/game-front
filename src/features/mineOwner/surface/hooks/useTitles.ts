import { useTranslation } from 'react-i18next';
import { mineOwnerCabinState } from '../../model';

export function useTitles() {
    const { t } = useTranslation();

    return {
        [mineOwnerCabinState.initial]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.hasMineNft]: t('features.mineOwner.mineNotSet'),
        [mineOwnerCabinState.isOutsideFromLocation]: t(
            'features.mineOwner.mineNotSet'
        ),
        [mineOwnerCabinState.needSignContractWithLandLord]: t(
            'features.mineOwner.mineNotSet'
        ),
        [mineOwnerCabinState.isMineActive]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMineSet]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMining]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMineSetupInProgress]: t(
            'features.mineOwner.progress'
        ),
    };
}
