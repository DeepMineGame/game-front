import React, { memo, useEffect } from 'react';
import {
    Button,
    getDmeAmount,
    getTimeLeft,
    KeyValueTable,
    Loader,
} from 'shared';
import {
    contractorStore,
    getContractorEffect,
    useSmartContractAction,
} from 'features';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { calcmining } from 'entities/smartcontract';

const THREE_SECONDS = 3000;

export const ClaimInfo = memo(({ accountName }: { accountName: string }) => {
    const { t } = useTranslation();

    const contractors = useStore(contractorStore);
    const isContractorLoading = useStore(getContractorEffect.pending);
    const calcMining = useSmartContractAction({
        action: calcmining({ waxUser: accountName }),
    });
    const timeSpent =
        contractors && contractors.finishes_at - contractors.starts_at;
    const dmeToClaim = contractors && contractors.params?.amount_to_claim;

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (accountName) {
            interval = setInterval(() => {
                getContractorEffect({ searchParam: accountName });
            }, THREE_SECONDS);
        }
        return () => clearInterval(interval);
    }, [accountName]);

    if (!dmeToClaim && isContractorLoading) {
        return <Loader />;
    }

    return dmeToClaim ? (
        <KeyValueTable
            items={{
                [t('pages.mining.timeSpent')]: timeSpent
                    ? getTimeLeft(timeSpent)
                    : '-',
                [t('pages.mining.dmeCollected')]:
                    getDmeAmount(dmeToClaim) || '-',
            }}
        />
    ) : (
        <Button onClick={calcMining} type="primary">
            {t('pages.mining.calculateMining')}
        </Button>
    );
});
