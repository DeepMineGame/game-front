import { useStore } from 'effector-react';
import { Trans } from 'react-i18next';
import { Link } from 'shared';
import { createOrder, equipmentSet } from 'app/router/paths';
import {
    $contractorCabin,
    $mineOwnerContracts,
    ContractorCabinStore,
} from 'features/contractor';
import { ContractDto } from 'entities/smartcontract';

enum DisabledState {
    NotDisabled,
    NeedSignContract,
    NotFullEquipmentSet,
    NeedFinishMineownerContract,
    MiningContractIsntActive,
    EquipmentIsBroken,
    LandlordContractFinished,
}

const States = (mineOwnerContract: ContractDto) => ({
    [DisabledState.NotDisabled]: {
        disabled: false,
        message: undefined,
        action: undefined,
    },
    [DisabledState.NeedSignContract]: {
        disabled: true,
        message: <Trans i18nKey="pages.mining.hasNoMineOwnerContracts" />,
        action: (
            <Link to={createOrder}>
                <Trans i18nKey="pages.mining.visitServiceMarket" />
            </Link>
        ),
    },
    [DisabledState.NotFullEquipmentSet]: {
        disabled: true,
        message: <Trans i18nKey="pages.mining.installEquipSet" />,
        action: (
            <Link to={equipmentSet}>
                <Trans i18nKey="pages.mining.configureButton" />
            </Link>
        ),
    },
    [DisabledState.NeedFinishMineownerContract]: {
        disabled: true,
        message: <Trans i18nKey="pages.mining.contractRequiresAction" />,
        action: (
            <Link to={`/service-market/contract/${mineOwnerContract?.id}`}>
                <Trans i18nKey="pages.mining.openContract" />
            </Link>
        ),
    },
    [DisabledState.MiningContractIsntActive]: {
        disabled: true,
        message: <Trans i18nKey="pages.mining.miningContractIsntActive" />,
        action: (
            <Link to={equipmentSet}>
                <Trans i18nKey="pages.mining.configureButton" />
            </Link>
        ),
    },
    [DisabledState.EquipmentIsBroken]: {
        disabled: true,
        message: <Trans i18nKey="pages.mining.somePiecesOfEquipmentIsBroken" />,
        action: (
            <Link to={equipmentSet}>
                <Trans i18nKey="pages.mining.configureButton" />
            </Link>
        ),
    },
    [DisabledState.LandlordContractFinished]: {
        disabled: true,
        message: (
            <Trans i18nKey="pages.mining.contractBetweenMineownerAndLandlordIsntValid" />
        ),
        action: undefined,
    },
});

const getState = (store: ContractorCabinStore) => {
    if (!store.hasMineOwnerContracts) {
        return DisabledState.NeedSignContract;
    }

    if (store.isNotFullEquipmentsSet) {
        return DisabledState.NotFullEquipmentSet;
    }

    if (store.needFinishMineownerContract) {
        return DisabledState.NeedFinishMineownerContract;
    }

    if (store.miningContractIsntActive) {
        return DisabledState.MiningContractIsntActive;
    }

    if (store.equipmentIsBroken) {
        return DisabledState.EquipmentIsBroken;
    }

    if (store.landlordContractFinished || !store.landlordContract) {
        return DisabledState.LandlordContractFinished;
    }

    return DisabledState.NotDisabled;
};

export const useDisabledState = () => {
    const [mineOwnerContract] = useStore($mineOwnerContracts);
    const contractorCabin = useStore($contractorCabin);
    const state = getState(contractorCabin);

    return States(mineOwnerContract)[state];
};
