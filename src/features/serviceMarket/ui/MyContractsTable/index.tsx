import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Segmented, useAccountName } from 'shared';
import { createOrder } from 'app/router/paths';
import { FilterOrderStatus } from 'entities/gameStat';
import {
    changeFilterEvent,
    orderStatusFilterStore,
} from '../../contracts/model';
import { ServiceMarketContractsTable } from '../../contracts';
import styles from './styles.module.scss';

export const MyContractsTab = () => {
    const { t } = useTranslation();
    const filterValue = useStore(orderStatusFilterStore);
    const navigate = useNavigate();
    const accountName = useAccountName();

    return (
        <>
            <div className={styles.buttons}>
                <Segmented
                    options={[
                        {
                            value: FilterOrderStatus.Current,
                            label: t('components.common.current'),
                        },
                        {
                            value: FilterOrderStatus.New,
                            label: t('components.common.new'),
                        },
                        {
                            value: FilterOrderStatus.Completed,
                            label: t('components.common.completed'),
                        },
                    ]}
                    onChange={(value) =>
                        changeFilterEvent(value as FilterOrderStatus)
                    }
                    value={filterValue || ''}
                />
                <Button
                    type="primary"
                    onClick={() => navigate(createOrder)}
                    icon={<PlusOutlined />}
                >
                    {t('pages.serviceMarket.createOrder.createOrder')}
                </Button>
            </div>
            {accountName && (
                <ServiceMarketContractsTable accountName={accountName} />
            )}
        </>
    );
};
