import { combine } from 'effector';
import {
    checkHasCrewEffect,
    checkIfNeedPhysicalShiftEffect,
    checkMineStateEffect,
    checkLandLordContractMineOwnerActiveContractEffect,
    initialMineNfrCheckEffect,
} from './effects';

export const isCabinStateEffectLoading$ = combine([
    checkLandLordContractMineOwnerActiveContractEffect.pending,
    checkHasCrewEffect.pending,
    checkIfNeedPhysicalShiftEffect.pending,
    checkMineStateEffect.pending,
    initialMineNfrCheckEffect.pending,
]).map((state) => state.some(Boolean));
