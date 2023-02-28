import React, { memo, useEffect, useState } from 'react';
import { Button, getDmeAmount, getTimeLeft, KeyValueTable } from 'shared';
import {
    $mineOwnerContracts,
    contractorStore,
    getContractorEffect,
    MiningPageGate,
    useSmartContractAction,
} from 'features';
import { useStore, useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { calcmining } from 'entities/smartcontract';

const THREE_SECONDS = 3000;

export const ClaimInfo = memo(({ accountName }: { accountName: string }) => {
    useGate(MiningPageGate, { searchParam: accountName });
    const [isMiningCalculating, setIsMiningCalculation] = useState(false);
    const { t } = useTranslation();

    const contractor = useStore(contractorStore);
    const [mineOwnerContract] = useStore($mineOwnerContracts);

    const calcMining = useSmartContractAction({
        action: calcmining({ waxUser: accountName }),
        onSignSuccess: () => setIsMiningCalculation(true),
    });
    const timeSpent =
        contractor && contractor.finishes_at - contractor.starts_at;
    const dmeToClaim = (contractor && contractor.params?.amount_to_claim) || 0;
    const feeInDme = mineOwnerContract
        ? (getDmeAmount(dmeToClaim) / 100) * mineOwnerContract.fee_percent
        : 0;

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (!contractor?.finished) {
            interval = setInterval(() => {
                getContractorEffect({ searchParam: accountName });
            }, THREE_SECONDS);
        } else {
            setIsMiningCalculation(false);
        }
        return () => clearInterval(interval);
    }, [accountName, contractor?.finished]);

    if (isMiningCalculating) {
        return (
            <Spin
                spinning
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
        );
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
