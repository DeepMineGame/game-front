import { useStore } from 'effector-react';
import {
    checkContractEffect,
    checkHasCrewEffect,
    checkIfNeedPhysicalShiftEffect,
    checkIsMineSetEffect,
    initialEffect,
} from '../../models';

export const useMineOwnerCabinLoader = () => {
    const isInitialEffectLoading = useStore(initialEffect.pending);
    const isCheckContractEffectLoading = useStore(checkContractEffect.pending);
    const isCheckIfNeedPhysicalShiftEffectLoading = useStore(
        checkIfNeedPhysicalShiftEffect.pending
    );
    const ifCheckIsMineSetEffectLoading = useStore(
        checkIsMineSetEffect.pending
    );
    const isCheckHasCrewEffectLoading = useStore(checkHasCrewEffect.pending);
    const isCheckIsMineSetEffectLoading = useStore(
        checkIsMineSetEffect.pending
    );

    return (
        isInitialEffectLoading ||
        isCheckContractEffectLoading ||
        isCheckIfNeedPhysicalShiftEffectLoading ||
        ifCheckIsMineSetEffectLoading ||
        isCheckHasCrewEffectLoading ||
        isCheckIsMineSetEffectLoading
    );
};
