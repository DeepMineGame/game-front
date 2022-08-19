import { useTranslation } from 'react-i18next';
import { mineOwnerCabinState } from '../../models/mineOwnerState';

export const useTitles = () => {
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
        [mineOwnerCabinState.needSetupMine]: t('features.mineOwner.mineNotSet'),
        [mineOwnerCabinState.isMineSet]: t('features.mineOwner.mineManagement'),
        [mineOwnerCabinState.isMineSetupInProgress]: t(
            'features.mineOwner.progress'
        ),
        [mineOwnerCabinState.isMineActive]: t(
            'features.mineOwner.mineIsActive'
        ),
    };
};
