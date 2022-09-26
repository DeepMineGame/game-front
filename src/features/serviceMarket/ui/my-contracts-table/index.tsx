import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { FC, useCallback } from 'react';
import { Button, Dropdown, Segmented, useAccountName } from 'shared';
import { createOrder } from 'app/router/paths';
import { Space } from 'antd';
import { FilterOrderStatus } from 'entities/gameStat';
import { changeFilterEvent, filterStore } from '../../contracts-table/model';
import { ServiceMarketContractsTable } from '../../contracts-table';
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
                    <Dropdown
                        items={[
                            {
                                label: t('roles.all'),
                                key: Role.all,
                                onClick: () => onChangeRole(Role.all),
                            },
                            {
                                label: t('roles.contractor'),
                                key: Role.contractor,
                                onClick: () => onChangeRole(Role.contractor),
                            },
                            {
                                label: t('roles.mineowner'),
                                key: Role.mineowner,
                                onClick: () => onChangeRole(Role.mineowner),
                            },
                        ]}
                    >
                        <Button type="link">
                            {t(
                                filter?.userRole
                                    ? `roles.${filter?.userRole}`
                                    : 'pages.serviceMarket.yourRole'
                            )}
                            <DownOutlined style={{ fontSize: 12 }} />
                        </Button>
                    </Dropdown>
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
