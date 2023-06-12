import { FC } from 'react';
import {
    ContractorEngineerTable,
    ContractorMineOwnerTable,
    EngineerContractorTable,
    EngineerMineOwnerTable,
    LandlordMineOwnerTable,
    MineOwnerContractorTable,
    MineOwnerEngineerTable,
    MineOwnerLandlordTable,
    MyContractsTable,
    useQuery,
} from 'shared';
import { useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';
import { OrderStatus, Roles } from 'entities/game-stat';
import {
    ContractsGate,
    contractsStore,
    filterStore,
    getContractsByFilterEffect,
} from './model';

export const ContractsRenderByRole: FC = () => {
    const query = useQuery();
    const searchRoleFromQuery = query.get('search_role') as Roles;
    const userRoleFromQuery = query.get('user_role') as Roles;

    const defaultFilter = {
        user_role: userRoleFromQuery || Roles.contractor,
        search_role: searchRoleFromQuery || Roles.mineowner,
    };
    useGate(ContractsGate, defaultFilter);

    const { user_role, search_role, user } = useStore(filterStore);
    const contracts = useStore(contractsStore);
    const isLoading = useStore(getContractsByFilterEffect.pending);

    if (isLoading) {
        return <Skeleton />;
    }

    if (user) {
        return <MyContractsTable contracts={contracts} />;
    }

    if (user_role === Roles.contractor && search_role === Roles.mineowner) {
        return <ContractorMineOwnerTable contracts={contracts} />;
    }

    if (user_role === Roles.contractor && search_role === Roles.engineer) {
        return <ContractorEngineerTable contracts={contracts} />;
    }

    if (user_role === Roles.landlord) {
        return <LandlordMineOwnerTable contracts={contracts} />;
    }

    if (user_role === Roles.mineowner && search_role === Roles.contractor) {
        return <MineOwnerContractorTable contracts={contracts} />;
    }

    if (user_role === Roles.mineowner && search_role === Roles.landlord) {
        return <MineOwnerLandlordTable contracts={contracts} />;
    }

    if (user_role === Roles.mineowner && search_role === Roles.engineer) {
        return <MineOwnerEngineerTable contracts={contracts} />;
    }

    if (user_role === Roles.engineer && search_role === Roles.contractor) {
        return <EngineerContractorTable contracts={contracts} />;
    }

    if (user_role === Roles.engineer && search_role === Roles.mineowner) {
        return <EngineerMineOwnerTable contracts={contracts} />;
    }
    return <Empty />;
};
