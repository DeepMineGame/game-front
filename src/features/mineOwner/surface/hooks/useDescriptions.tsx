import { useTranslation } from 'react-i18next';
import { desktopS, useMediaQuery } from 'shared';
import { mineOwnerCabinState } from '../../models/mineOwnerState';
import { MineStat } from '../ui/components/mineStat';

export const useDescriptions = () => {
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
        [mineOwnerCabinState.needSetupMine]: t(
            'features.mineOwner.needSetupMine'
        ),
        [mineOwnerCabinState.hasNoMineNft]: isDesktop
            ? t('features.mineOwner.needMineCardDesktop')
            : t('features.mineOwner.needMineCardMobile'),
        [mineOwnerCabinState.isMineSet]: t(
            'features.mineOwner.mineManagementDescription'
        ),
        [mineOwnerCabinState.isMineSetupInProgress]: t(
            'features.mineOwner.progress'
        ),
        [mineOwnerCabinState.isMineActive]: isDesktop ? (
            <MineStat />
        ) : (
            t('features.mineOwner.mineIsActiveDescriptionMobile')
        ),
    };
};
