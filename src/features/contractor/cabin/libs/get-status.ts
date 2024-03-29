import { ContractorCabinStatus } from '../constants';
import { ContractorCabinStore } from '../model';

export const getStatus = (store: ContractorCabinStore) => {
    if (
        !store.hasMineOwnerContracts &&
        !store.activeMining &&
        !store.miningOver
    ) {
        return ContractorCabinStatus.sign_contract;
    }

    if (!store.installedMiningEquipments.length) {
        return ContractorCabinStatus.no_equipments;
    }

    if (store.isNotFullEquipmentsSet) {
        return ContractorCabinStatus.not_full_equipments_set;
    }

    if (!store.activeMining) {
        return ContractorCabinStatus.ready;
    }

    if (store.miningOver) {
        return ContractorCabinStatus.mining_over;
    }

    if (store.activeMining) {
        return ContractorCabinStatus.mining_progress;
    }

    if (store.interruptedMining.length) {
        return ContractorCabinStatus.mining_interrupted;
    }

    return ContractorCabinStatus.undefined;
};
