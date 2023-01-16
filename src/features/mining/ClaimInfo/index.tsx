import React, { memo } from 'react';
import {
    Button,
    getDmeAmount,
    getTimeLeft,
    KeyValueTable,
    Loader,
} from 'shared';
import {
    $mineOwnerContracts,
    contractorStore,
    getContractorEffect,
    useSmartContractAction,
} from 'features';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { calcmining } from 'entities/smartcontract';

export const ClaimInfo = memo(({ accountName }: { accountName: string }) => {
    const { t } = useTranslation();

    const contractor = useStore(contractorStore);
    const [mineOwnerContract] = useStore($mineOwnerContracts);
    const isContractorLoading = useStore(getContractorEffect.pending);
    const calcMining = useSmartContractAction({
        action: calcmining({ waxUser: accountName }),
        onSignSuccess: () => getContractorEffect({ searchParam: accountName }),
    });
    const timeSpent =
        contractor && contractor.finishes_at - contractor.starts_at;
    const dmeToClaim = (contractor && contractor.params?.amount_to_claim) || 0;
    const feeInDme = mineOwnerContract
        ? (getDmeAmount(dmeToClaim) / 100) * mineOwnerContract.fee_percent
        : 0;

    if (isContractorLoading) {
        return <Loader />;
    }

    return contractor?.finished ? (
        <KeyValueTable
            items={{
                [t('pages.mining.timeSpent')]: timeSpent
                    ? getTimeLeft(timeSpent)
                    : '-',
                [t('pages.mining.availableForClaim')]: getDmeAmount(dmeToClaim),
                [t('pages.serviceMarket.contract.fee')]: Number(
                    feeInDme.toFixed(8)
                ),
                [t('pages.mining.transferredToYourAccount')]: Number(
                    (getDmeAmount(dmeToClaim) - feeInDme).toFixed(8)
                ),
            }}
        />
    ) : (
        <Button onClick={calcMining} type="primary">
            {t('pages.mining.calculateMining')}
        </Button>
    );
});
