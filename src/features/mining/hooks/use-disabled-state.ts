import { useGate, useStore } from 'effector-react';
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

export const useDisabledState = (accountName: string) => {
    useGate(MineOwnerContractsGate, { searchParam: accountName });
    const mineOwnerContracts = useStore($mineOwnerContracts);
    const landlordContract = useStore($landlordContract);

    const hasNoMineOwnerContracts = mineOwnerContracts.length === 0;
    const needFinishCurrentContract =
        mineOwnerContracts[0] &&
        (contractWasTerminated(mineOwnerContracts[0]) ||
            contractIsExpired(mineOwnerContracts[0]));

    // const hasContractBetweenLandlordMineowner = !(
    //     contractIsExpired(landlordContract) ||
    //     contractWasTerminated(landlordContract)
    // );

    return hasNoMineOwnerContracts || needFinishCurrentContract;
    // hasContractBetweenLandlordMineowner
};
