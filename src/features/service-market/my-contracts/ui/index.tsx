import { FC, useCallback, useMemo } from 'react';
import { ContractsTable, Segmented, useAccountName } from 'shared';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { TabGrid } from '../../ui';
import {
    changeMyContractsFilterEvent,
    getMyContractsByFilterEffect,
    MyContractsGate,
    myContractsStore,
} from '../model';

enum ContractsType {
    current,
    personal,
}
export const MyContracts: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const defaultFilterValue = useMemo(
        () => ({
            user: accountName,
        }),
        [accountName]
    );
    useGate(MyContractsGate, defaultFilterValue);
    const contracts = useStore(myContractsStore);
    const isLoading = useStore(getMyContractsByFilterEffect.pending);

    const onChangeContractsType = useCallback(
        (type) => {
            if (type === ContractsType.current) {
                return changeMyContractsFilterEvent(defaultFilterValue);
            }
            changeMyContractsFilterEvent({ user: accountName, offers: true });
        },
        [accountName, defaultFilterValue]
    );

    return (
        <TabGrid
            filters={
                <Segmented
                    options={[
                        {
                            value: ContractsType.current,
                            label: t('pages.serviceMarket.currentContracts'),
                        },
                        {
                            value: ContractsType.personal,
                            label: t('pages.serviceMarket.personalContracts'),
                        },
                    ]}
                    onChange={onChangeContractsType}
                />
            }
            table={
                isLoading ? (
                    <Skeleton />
                ) : (
                    <ContractsTable contracts={contracts} />
                )
            }
        />
    );
};
