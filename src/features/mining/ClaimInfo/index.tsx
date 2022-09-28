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

    const contractor = useStore(contractorStore);
    const isContractorLoading = useStore(getContractorEffect.pending);
    const calcMining = useSmartContractAction({
        action: calcmining({ waxUser: accountName }),
    });
    const timeSpent =
        contractor && contractor.finishes_at - contractor.starts_at;
    const dmeToClaim = (contractor && contractor.params?.amount_to_claim) || 0;

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (!contractor?.finished) {
            interval = setInterval(() => {
                getContractorEffect({ searchParam: accountName });
            }, THREE_SECONDS);
        }
        return () => clearInterval(interval);
    }, [accountName, contractor?.finished]);

    if (!contractor?.finished && isContractorLoading) {
        return <Loader />;
    }

    return contractor?.finished ? (
        <KeyValueTable
            items={{
                [t('pages.mining.timeSpent')]: timeSpent
                    ? getTimeLeft(timeSpent)
                    : '-',
                [t('pages.mining.dmeCollected')]: getDmeAmount(dmeToClaim),
            }}
        />
    ) : (
        <Button onClick={calcMining} type="primary">
            {t('pages.mining.calculateMining')}
        </Button>
    );
});
