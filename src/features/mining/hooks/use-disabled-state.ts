import { useGate, useStore } from 'effector-react';
import { $mineOwnerContracts, MineOwnerContractsGate } from '../miningModel';

export const useDisabledState = (accountName: string) => {
    useGate(MineOwnerContractsGate, { searchParam: accountName });
    const mineOwnerContracts = useStore($mineOwnerContracts);
    const hasNoMineOwnerContracts = mineOwnerContracts.length === 0;
    const needFinishCurrentContract =
        !!mineOwnerContracts[0].term_time ||
        mineOwnerContracts[0].finishes_at * 1000 < Date.now();

    return hasNoMineOwnerContracts || needFinishCurrentContract;
};
