import { useTranslation } from 'react-i18next';
import { PageWithTabs, Segmented, useQuery } from 'shared';
import { FC, useEffect } from 'react';
import { useEvent, useStore } from 'effector-react';
import styles from './styles.module.scss';
import { TabGrid } from './ui/tab-grid';
import { Table } from './ui';
import {
    $contracts,
    $filters,
    changeFilterEvent,
    changeTabEvent,
    Tab,
} from './model';

export const FilterByRole = {
    [Tab.Contactor]: 'contractor',
    [Tab.Engineer]: 'engineer',
    [Tab.Mineowner]: 'mineowner',
    [Tab.Landlord]: 'landlord',
} as const;

export const ServiceMarketPageNew: FC = () => {
    const query = useQuery();
    const { t } = useTranslation();
    const tabId: Tab = Number(query.get('tabId'));

    const filters = useStore($filters);
    const contracts = useStore($contracts);

    const changeFilter = useEvent(changeFilterEvent);
    const changeTab = useEvent(changeTabEvent);

    useEffect(() => {
        changeTab(tabId);
        changeFilter({
            ...filters,
            [tabId]: { ...filters[tabId], userRole: FilterByRole[tabId] },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabId]);

    return (
        <PageWithTabs
            className={styles.page}
            defaultDocTitle
            title={t('pages.serviceMarket.serviceMarket')}
            tabs={[
                {
                    key: Tab.Contactor,
                    children: (
                        <TabGrid
                            filters={
                                <Segmented
                                    options={[
                                        {
                                            value: FilterByRole[1],
                                            label: t('roles.mineowner'),
                                        },
                                        {
                                            value: FilterByRole[3],
                                            label: t('roles.engineer'),
                                        },
                                    ]}
                                    onChange={(v) =>
                                        changeFilter({
                                            ...filters,
                                            [Tab.Contactor]: {
                                                ...filters[Tab.Contactor],
                                                searchRole: v as string,
                                            },
                                        })
                                    }
                                    value={filters[Tab.Contactor].searchRole}
                                />
                            }
                            table={<Table columns={[]} dataSource={[]} />}
                        />
                    ),
                    tab: t('roles.contractor'),
                },
                {
                    key: Tab.Mineowner,
                    children: (
                        <TabGrid
                            filters={
                                <Segmented
                                    options={[
                                        {
                                            value: FilterByRole[0],
                                            label: t('roles.contractor'),
                                        },
                                        {
                                            value: FilterByRole[2],
                                            label: t('roles.landlord'),
                                        },
                                        {
                                            value: FilterByRole[3],
                                            label: t('roles.engineer'),
                                        },
                                    ]}
                                    onChange={(v) =>
                                        changeFilter({
                                            ...filters,
                                            [Tab.Mineowner]: {
                                                ...filters[Tab.Mineowner],
                                                searchRole: v as string,
                                            },
                                        })
                                    }
                                    value={filters[Tab.Mineowner].searchRole}
                                />
                            }
                            table={<Table columns={[]} dataSource={[]} />}
                        />
                    ),
                    tab: t('roles.mineowner'),
                },
                {
                    key: Tab.Landlord,
                    children: (
                        <TabGrid
                            filters={
                                <Segmented
                                    options={[
                                        {
                                            value: FilterByRole[1],
                                            label: t('roles.mineowner'),
                                        },
                                    ]}
                                    onChange={(v) =>
                                        changeFilter({
                                            ...filters,
                                            [Tab.Landlord]: {
                                                ...filters[Tab.Landlord],
                                                searchRole: v as string,
                                            },
                                        })
                                    }
                                    value={filters[Tab.Landlord].searchRole}
                                />
                            }
                            table={<Table columns={[]} dataSource={[]} />}
                        />
                    ),
                    tab: t('roles.landlord'),
                },
                {
                    key: Tab.Engineer,
                    children: (
                        <TabGrid
                            filters={
                                <Segmented
                                    options={[
                                        {
                                            value: FilterByRole[0],
                                            label: t('roles.contractor'),
                                        },
                                        {
                                            value: FilterByRole[1],
                                            label: t('roles.mineowner'),
                                        },
                                    ]}
                                    onChange={(v) =>
                                        changeFilter({
                                            ...filters,
                                            [Tab.Engineer]: {
                                                ...filters[Tab.Engineer],
                                                searchRole: v as string,
                                            },
                                        })
                                    }
                                    value={filters[Tab.Engineer].searchRole}
                                />
                            }
                            table={<Table columns={[]} dataSource={[]} />}
                        />
                    ),
                    tab: t('roles.engineer'),
                },
            ]}
        />
    );
};
