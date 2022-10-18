import { useGate, useStore } from 'effector-react';
import { Trans } from 'react-i18next';
import { Alert, Link } from 'shared';
import { createOrder, equipmentSet } from 'app/router/paths';
// eslint-disable-next-line no-restricted-imports
import { ContractorCabinStatus } from 'pages/contractor/contractorCabin/constants';
import { ContractDto } from 'entities/smartcontract';
import {
    $landlordContract,
    $mineOwnerContracts,
    MineOwnerContractsGate,
} from '../miningModel';

const contractIsExpired = (contract: ContractDto) =>
    contract.finishes_at * 1000 < Date.now();
const contractWasTerminated = (contract: ContractDto) =>
    Boolean(contract.term_time);

enum DisabledState {
    NotDisabled,
    RequiresAction,
    EquipmentIsBroken,
    LandlordContractFinished,
}

const States = ({
    mineOwnerContract,
    landlordContract,
}: Record<'landlordContract' | 'mineOwnerContract', ContractDto>) => ({
    [DisabledState.NotDisabled]: {
        disabledMiningButton: false,
        alert: (
            <Alert
                message={
                    <Trans i18nKey="pages.mining.contractBetweenMineownerAndLandlordIsntValid" />
                }
                action={
                    <Link to={`/user/${landlordContract?.executor}`}>
                        <Trans i18nKey="pages.mining.openContract" />
                    </Link>
                }
            />
        ),
    },
    [ContractorCabinStatus.sign_contract]: {
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
    [ContractorCabinStatus.no_equipments]: {
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
    [DisabledState.RequiresAction]: {
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

const getState = (store: any) => {
    if (store.hasNoMineOwnerContracts) {
        return ContractorCabinStatus.sign_contract;
    }

    // if (store.noEquipments) {
    //     return ContractorCabinStatus.no_equipments;
    // }

    if (store.needFinishMineownerContract) {
        return DisabledState.RequiresAction;
    }

    // if (store.equipmentIsbroken) {
    //     return DisabledState.EquipmentIsBroken
    // }

    if (store.isLandlordContractFinished) {
        return DisabledState.LandlordContractFinished;
    }

    return DisabledState.NotDisabled;
};

export const useDisabledState = (accountName: string) => {
    useGate(MineOwnerContractsGate, { searchParam: accountName });
    const mineOwnerContracts = useStore($mineOwnerContracts);
    const landlordContract = useStore($landlordContract);
    const store = useStore;
    const state = getState(store);

    const { disabledMiningButton, alert } = States({
        mineOwnerContract: mineOwnerContracts[0],
        landlordContract,
    })[state];

    const hasNoMineOwnerContracts = mineOwnerContracts.length === 0;

    const needFinishMineownerContract =
        mineOwnerContracts[0] &&
        (contractWasTerminated(mineOwnerContracts[0]) ||
            contractIsExpired(mineOwnerContracts[0]));

    const isLandlordContractFinished =
        landlordContract &&
        (contractWasTerminated(landlordContract) ||
            contractIsExpired(landlordContract));

    //--

    return { disabledMiningButton, alert };
};
