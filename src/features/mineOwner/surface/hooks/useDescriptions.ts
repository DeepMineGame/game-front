import { useTranslation } from 'react-i18next';
import { desktopS, useMediaQuery } from 'shared';
import { mineOwnerCabinState } from '../../model';

export function useDescriptions() {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);

    return {
        [mineOwnerCabinState.initial]: isDesktop
            ? t('features.mineOwner.needMineCardDesktop')
            : t('features.mineOwner.needMineCardMobile'),
        [mineOwnerCabinState.isOutsideFromLocation]: t(
            'features.mineOwner.needShift'
        ),
        [mineOwnerCabinState.needSignContractWithLandLord]: t(
            'features.mineOwner.needLandLord'
        ),
        [mineOwnerCabinState.hasMineNft]: t('features.mineOwner.mineNotSet'),
        [mineOwnerCabinState.isMineActive]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMineSet]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMining]: t('features.mineOwner.welcome'),
        [mineOwnerCabinState.isMineSetupInProgress]: t(
            'features.mineOwner.progress'
        ),
    };
}
