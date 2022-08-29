import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { FC, useCallback } from 'react';
import { Button, Segmented, Select, useAccountName } from 'shared';
import { createOrder } from 'app/router/paths';
import { Space } from 'antd';
import { FilterOrderStatus } from 'entities/gameStat';
import { changeFilterEvent, filterStore } from '../../contracts/model';
import { ServiceMarketContractsTable } from '../../contracts';
import styles from './styles.module.scss';

export enum Role {
    all = 'all',
    contractor = 'contractor',
    mineowner = 'mineowner',
}

export const MyContractsTab: FC = () => {
    const { t } = useTranslation();
    const filter = useStore(filterStore);
    const navigate = useNavigate();
    const accountName = useAccountName();
    const onChangeRole = useCallback(
        (userRole) => {
            changeFilterEvent({
                ...filter,
                userRole,
            });
        },
        [filter]
    );
    const onChangeStatus = useCallback(
        (status) =>
            changeFilterEvent({
                ...filter,
                status: status as FilterOrderStatus,
            }),
        [filter]
    );

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
                    onChange={onChangeStatus}
                    value={filter?.status}
                />
                <Space>
                    <Select
                        dropdownMatchSelectWidth={false}
                        placeholder={t('pages.serviceMarket.yourRole')}
                        options={[
                            {
                                label: t('pages.serviceMarket.all'),
                                value: Role.all,
                            },
                            {
                                label: t('roles.contractor'),
                                value: Role.contractor,
                            },
                            {
                                label: t('roles.mineOwner'),
                                value: Role.mineowner,
                            },
                        ]}
                        value={filter?.userRole}
                        onChange={onChangeRole}
                        bordered={false}
                    />
                    <Button
                        type="primary"
                        onClick={() => navigate(createOrder)}
                        icon={<PlusOutlined />}
                    >
                        {t('pages.serviceMarket.createOrder.createOrder')}
                    </Button>
                </Space>
            </div>
            {accountName && (
                <ServiceMarketContractsTable accountName={accountName} />
            )}
        </>
    );
};
