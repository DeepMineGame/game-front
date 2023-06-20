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
    useAccountName,
    useQuery,
} from 'shared';
import { useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';
import { Roles } from 'entities/game-stat';
import {
    activeRadioButton$,
    RadioButtonContractTypeNames,
} from '../role-select/model';
import {
    ContractsGate,
    contractsStore,
    filterStore,
    getContractsByFilterEffect,
} from './model';

export const ContractsRenderByRole: FC = () => {
    const filters = useStore(filterStore);

    const query = useQuery();
    const searchRoleFromQuery = query.get('search_role') as Roles;
    const userRoleFromQuery = query.get('user_role') as Roles;
    const accountName = useAccountName();

    const defaultFilter = {
        user_role: userRoleFromQuery || Roles.contractor,
        search_role: searchRoleFromQuery || Roles.mineowner,
        user: accountName,
    };
    useGate(ContractsGate, filters || defaultFilter);
    const activeRadioButton = useStore(activeRadioButton$);

    const contracts = useStore(contractsStore);
    const isLoading = useStore(getContractsByFilterEffect.pending);
    const { user_role, search_role } = filters;

    if (isLoading) {
        return <Skeleton />;
    }

    if (
        activeRadioButton === RadioButtonContractTypeNames['My contracts'] ||
        activeRadioButton === RadioButtonContractTypeNames['Contract offerings']
    ) {
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
