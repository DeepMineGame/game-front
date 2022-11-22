import { useTranslation } from 'react-i18next';
import { FC, useCallback } from 'react';
import { ContractsTable, Segmented } from 'shared';
import { Skeleton, Space } from 'antd';
import { useGate, useStore } from 'effector-react';
import {
    changeFilterEvent,
    ContractsGate,
    contractsStore,
    filterStore,
    getContractsByFilterEffect,
    TabGrid,
} from 'features/serviceMarket';

import { OrderStatus, Roles } from 'entities/gameStat';

export const EngineerTab: FC = () => {
    const { t } = useTranslation();

    useGate(ContractsGate, {
        statuses: OrderStatus.current,
        user_role: Roles.engineer,
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
