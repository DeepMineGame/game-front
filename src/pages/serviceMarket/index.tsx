import { PageWithTabs } from 'shared';
import React from 'react';
import { Empty } from 'antd';
import styles from './styles.module.scss';

export const ServiceMarketPage = () => {
    return (
        <PageWithTabs
            className={styles.page}
            title="SERVICE MARKET"
            tabs={[
                { id: 1, component: Empty, name: 'My contracts' },
                { id: 2, component: Empty, name: 'Mining contracts' },
                { id: 3, component: Empty, name: 'Mine operation' },
            ]}
        />
    );
};
