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
} from '../../contractor-table/model';

export const LandlordTab = () => {
    const { t } = useTranslation();

    useGate(ContractsGate, {
        statuses: OrderStatus.new,
        user_role: Roles.landlord,
        search_role: Roles.mineowner,
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
                                value: Roles.mineowner,
                                label: t('roles.mineowner'),
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
