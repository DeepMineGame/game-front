import React, { FC } from 'react';
import { Page, useAccountName } from 'shared';
import { useStore } from 'effector-react';
import { Travel } from 'features';
import { Flat, isUserInHive } from 'features/hive';
import {
    getSmartContractUserEffect,
    LOCATION_TO_ID,
} from 'entities/smartcontract';
import styles from './styles.module.scss';

export * from './info';

export const HivePage: FC = () => {
    const isUserInFlat = useStore(isUserInHive);
    const accountName = useAccountName();

    return (
        <Flat>
            <Page className={styles.page} headerTitle="Hive" />
            {!isUserInFlat && (
                <Travel
                    toLocationId={LOCATION_TO_ID.hive}
                    onSuccess={() =>
                        getSmartContractUserEffect({ searchParam: accountName })
                    }
                />
            )}
        </Flat>
    );
};
