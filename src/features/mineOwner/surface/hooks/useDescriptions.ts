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
        [mineOwnerCabinState.contractsFree]: t(
            'features.mineOwner.needTeamDescription'
        ),
        [mineOwnerCabinState.isMineSet]: t(
            'features.mineOwner.mineManagementDescription'
        ),
        [mineOwnerCabinState.isMineSetupInProgress]: t(
            'features.mineOwner.progress'
        ),
        [mineOwnerCabinState.isMineActive]: isDesktop
            ? t('features.mineOwner.mineIsActiveDescription')
            : t('features.mineOwner.mineIsActiveDescriptionMobile'),
    };
}
