import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useEvent, useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';
import { Button, Segmented } from 'shared';
import { createOrder } from 'app/router/paths';
import { MiningContractsTable } from '../mining-contracts/MiningContractsTable';
import styles from '../mining-contracts/styles.module.scss';
import {
    changeFilterEvent,
    Filter,
    filteredMineOperationContractsStore,
    filterStore,
    getMineOperationContractsEffect,
    MineOperationContractsGate,
} from './model';

export const MineOperationContracts = () => {
    useGate(MineOperationContractsGate);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const contracts = useStore(filteredMineOperationContractsStore);
    const isLoading = useStore(getMineOperationContractsEffect.pending);
    const filter = useStore(filterStore);

    const changeFilter = useEvent(changeFilterEvent);

    const handleFilterChange = (newFilter: string | number) => {
        changeFilter(newFilter as Filter);
    };

    const handleCreateOrder = () => {
        navigate(createOrder);
    };

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <div>
            <nav className={styles.nav}>
                <Segmented
                    options={[
                        {
                            value: Filter.LookingForMineOwner,
                            label: t('pages.serviceMarket.lookingForMineOwner'),
                        },
                        {
                            value: Filter.LookingForLandlord,
                            label: t('pages.serviceMarket.lookingForLandlord'),
                        },
                    ]}
                    onChange={handleFilterChange}
                    value={filter}
                />
                <Button
                    type="primary"
                    onClick={handleCreateOrder}
                    icon={<PlusOutlined />}
                >
                    {t('pages.serviceMarket.createOrder.createOrder')}
                </Button>
            </nav>
            {contracts.length ? (
                <MiningContractsTable contracts={contracts} />
            ) : (
                <Empty />
            )}
        </div>
    );
};
