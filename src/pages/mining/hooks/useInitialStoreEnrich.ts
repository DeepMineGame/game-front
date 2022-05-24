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
} from 'entities/smartcontracts';
import { userStore } from 'entities/user';

export function useInitialStoreEnrich() {
    const user = useStore(userStore);
    const chainAccount = useChainAuthContext();
    const contracts = useStore(contractStore);
    const mineStore = useStore(minesStore);

    useEffect(() => {
        if (user && chainAccount.activeUser?.accountName) {
            getContractEffect({
                searchIdentification:
                    mapSearchParamForIndexPositionToFindContracts.executorId,
                searchParam: chainAccount.activeUser.accountName,
            });
        }
    }, [user, chainAccount.activeUser?.accountName]);

    useEffect(() => {
        if (contracts?.length) {
            getActionEffect({
                searchIdentification: mapSearchParamForIndexPosition.contractId,
                searchParam: contracts[0].id,
            });
        }
    }, [contracts]);

    useEffect(() => {
        if (contracts?.length && !mineStore) {
            getMinesEffect({ assetId: contracts[0].client_asset_id });
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
