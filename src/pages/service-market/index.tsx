import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { Contracts } from 'features';
import { FC } from 'react';

import styles from './styles.module.scss';

export * from './order';
export * from './operation';

export const ServiceMarketPage: FC = () => {
    const { t } = useTranslation();

    return (
        <Page className={styles.page} headerTitle={t('SERVICE MARKET')}>
            <Contracts />
        </Page>
    );
};
