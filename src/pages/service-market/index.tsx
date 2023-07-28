import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { Contracts, RentalContractsTable } from 'features';
import { FC } from 'react';

import styles from './styles.module.scss';

export * from './order';
export * from './operation';
export enum ServiceMarketPageType {
    serviceMarket,
    rentalHub,
}
export const ServiceMarketPage: FC<{ type: ServiceMarketPageType }> = ({
    type = ServiceMarketPageType.serviceMarket,
}) => {
    const { t } = useTranslation();

    return (
        <Page className={styles.page} headerTitle={t('SERVICE MARKET')}>
            {type === ServiceMarketPageType.serviceMarket ? (
                <Contracts />
            ) : (
                <RentalContractsTable />
            )}
        </Page>
    );
};
