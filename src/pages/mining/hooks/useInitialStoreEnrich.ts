import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useChainAuthContext } from 'shared';
import {
    contractStore,
    getActionEffect,
    getContractEffect,
    getMinesEffect,
    mapSearchParamForIndexPositionToFindContracts,
    minesStore,
    getInventoriesEffect,
    mapSearchParamForIndexPosition,
} from 'entities/smartcontract';

export function useInitialStoreEnrich() {
    const chainAccount = useChainAuthContext();
    const contracts = useStore(contractStore);
    const mineStore = useStore(minesStore);

    useEffect(() => {
        if (chainAccount.activeUser?.accountName) {
            getContractEffect({
                searchIdentification:
                    mapSearchParamForIndexPositionToFindContracts.executorId,
                searchParam: chainAccount.activeUser.accountName,
            });
        }
    }, [chainAccount.activeUser?.accountName]);

    useEffect(() => {
        if (contracts?.length && chainAccount.activeUser) {
            getActionEffect({
                searchIdentification:
                    mapSearchParamForIndexPosition.ownerUserId,
                searchParam: chainAccount.activeUser.accountName,
            });
        }
    }, [contracts, chainAccount?.activeUser]);

    useEffect(() => {
        if (contracts?.length && !mineStore) {
            getMinesEffect({ searchParam: contracts[0].client_asset_id });
        }
    }, [contracts, mineStore]);

    useEffect(() => {
        if (chainAccount?.activeUser?.accountName) {
            getInventoriesEffect({
                searchParam: chainAccount.activeUser.accountName,
            });
        }
    }, [chainAccount.activeUser?.accountName]);
}
