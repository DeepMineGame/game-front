import { combine } from 'effector';
import {
    checkHasCrewEffect,
    checkIfNeedPhysicalShiftEffect,
    checkIsMineSetEffect,
    checkLandLordContractMineOwnerActiveContractEffect,
    initialMineNfrCheckEffect,
} from './effects';

export const isCabinStateEffectLoading$ = combine([
    checkLandLordContractMineOwnerActiveContractEffect.pending,
    checkHasCrewEffect.pending,
    checkIfNeedPhysicalShiftEffect.pending,
    checkIsMineSetEffect.pending,
    initialMineNfrCheckEffect.pending,
]).map((state) => state.some(Boolean));
