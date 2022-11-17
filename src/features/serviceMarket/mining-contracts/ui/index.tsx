import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { Skeleton, Space } from 'antd';
import { ContractsTable, Segmented } from 'shared';
import { useCallback } from 'react';
import { OrderStatus, Roles } from 'entities/gameStat';
import { TabGrid } from '../../ui';

import {
    changeFilterEvent,
    ContractsGate,
    contractsStore,
    filterStore,
    getContractsByFilterEffect,
} from '../../contracts-table/model';

export const MineOwnerTab = () => {
    const { t } = useTranslation();

    useGate(ContractsGate, {
        statuses: OrderStatus.current,
        user_role: Roles.mineowner,
        search_role: Roles.contractor,
    });

    const contracts = useStore(contractsStore);
    const isLoading = useStore(getContractsByFilterEffect.pending);
    const filter = useStore(filterStore);

    const onChangeSearchRole = useCallback(
        (role) =>
            changeFilterEvent({
                ...filter,
                search_role: role,
            }),
        [filter]
    );

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <TabGrid
            filters={
                <Space>
                    <div>Looking for: </div>
                    <Segmented
                        options={[
                            {
                                value: Roles.contractor,
                                label: t('roles.contractor'),
                            },
                            {
                                value: Roles.landlord,
                                label: t('roles.landlord'),
                            },
                            {
                                value: Roles.engineer,
                                label: t('roles.engineer'),
                            },
                        ]}
                        onChange={onChangeSearchRole}
                        value={filter.search_role}
                    />
                </Space>
            }
            table={<ContractsTable contracts={contracts} />}
        />
    );
};
