import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useChainAuthContext } from 'shared';
import {
    contractStore,
    getActionEffect,
    getContractEffect,
    getMinesEffect,
    mapSearchParamForIndexPosition as mapSearchParamForIndexPositionForContract,
    mapSearchParamForIndexPositionToFindContracts,
    minesStore,
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
    }, [user, chainAccount]);

    useEffect(() => {
        if (contracts?.length) {
            getActionEffect({
                searchIdentification:
                    mapSearchParamForIndexPositionForContract.contractId,
                searchParam: contracts[0].id,
            });
        }
    }, [contracts]);

    useEffect(() => {
        if (contracts?.length && !mineStore) {
            getMinesEffect({ assetId: contracts[0].client_asset_id });
        }
    }, [contracts, mineStore]);
}
