import { useStore } from 'effector-react';
import { Trans } from 'react-i18next';
import { Alert, Link } from 'shared';
import { createOrder, equipmentSet } from 'app/router/paths';
import {
    $contractorCabin,
    $landlordContract,
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

const States = ({
    mineOwnerContract,
    landlordContract,
}: Record<'landlordContract' | 'mineOwnerContract', ContractDto | null>) => ({
    [DisabledState.NotDisabled]: {
        disabledMiningButton: false,
        alert: undefined,
    },
    [DisabledState.NeedSignContract]: {
        disabledMiningButton: true,
        alert: (
            <Alert
                message={
                    <Trans i18nKey="pages.mining.hasNoMineOwnerContracts" />
                }
                action={
                    <Link to={createOrder}>
                        <Trans i18nKey="pages.mining.visitServiceMarket" />
                    </Link>
                }
            />
        ),
    },
    [DisabledState.NotFullEquipmentSet]: {
        disabledMiningButton: true,
        alert: (
            <Alert
                message={<Trans i18nKey="pages.mining.installEquipSet" />}
                action={
                    <Link to={equipmentSet}>
                        <Trans i18nKey="pages.mining.configureButton" />
                    </Link>
                }
            />
        ),
    },
    [DisabledState.NeedFinishMineownerContract]: {
        disabledMiningButton: true,
        alert: (
            <Alert
                message={
                    <Trans i18nKey="pages.mining.contractRequiresAction" />
                }
                action={
                    <Link
                        to={`/service-market/contract/${mineOwnerContract?.id}`}
                    >
                        <Trans i18nKey="pages.mining.openContract" />
                    </Link>
                }
            />
        ),
    },
    [DisabledState.MiningContractIsntActive]: {
        disabledMiningButton: true,
        alert: (
            <Alert
                message={
                    <Trans i18nKey="pages.mining.miningContractIsntActive" />
                }
                action={
                    <Link to={equipmentSet}>
                        <Trans i18nKey="pages.mining.configureButton" />
                    </Link>
                }
            />
        ),
    },
    [DisabledState.EquipmentIsBroken]: {
        disabledMiningButton: true,
        alert: (
            <Alert
                message={
                    <Trans i18nKey="pages.mining.somePiecesOfEquipmentIsBroken" />
                }
                action={
                    <Link to={equipmentSet}>
                        <Trans i18nKey="pages.mining.configureButton" />
                    </Link>
                }
            />
        ),
    },
    [DisabledState.LandlordContractFinished]: {
        disabledMiningButton: true,
        alert: (
            <Alert
                message={
                    <Trans i18nKey="pages.mining.contractBetweenMineownerAndLandlordIsntValid" />
                }
                action={
                    <Link to={`/user/${landlordContract?.client}`}>
                        <Trans i18nKey="pages.mining.openContract" />
                    </Link>
                }
            />
        ),
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

    if (store.landlordContractFinished) {
        return DisabledState.LandlordContractFinished;
    }

    return DisabledState.NotDisabled;
};

export const useDisabledState = () => {
    const mineOwnerContracts = useStore($mineOwnerContracts);
    const landlordContract = useStore($landlordContract);
    const contractorCabin = useStore($contractorCabin);
    const state = getState(contractorCabin);

    const { disabledMiningButton, alert } = States({
        mineOwnerContract: mineOwnerContracts[0],
        landlordContract,
    })[state];

    return { disabledMiningButton, alert };
};
