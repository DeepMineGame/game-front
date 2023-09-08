import React, { memo, useEffect, useState } from 'react';
import {
    Button,
    DMECoinIcon,
    getDmeAmount,
    getTimeLeft,
    KeyValueTable,
    TimerIcon,
} from 'shared';
import { $miningStat, getMiningEffect, useSmartContractAction } from 'features';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { calcmining } from 'entities/smartcontract';

const THREE_SECONDS = 3000;

export const ClaimInfo = memo(({ accountName }: { accountName: string }) => {
    const [isMiningCalculating, setIsMiningCalculation] = useState(false);
    const { t } = useTranslation();
    const miningStat = useStore($miningStat);

    const calcMining = useSmartContractAction({
        action: calcmining({ waxUser: accountName }),
        onSignSuccess: () => setIsMiningCalculation(true),
    });

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (!miningStat?.finished) {
            interval = setInterval(() => {
                getMiningEffect({ accountName });
            }, THREE_SECONDS);
        } else {
            setIsMiningCalculation(false);
        }
        return () => clearInterval(interval);
    }, [accountName, miningStat?.finished]);

    if (isMiningCalculating) {
        return (
            <Spin
                spinning
                indicator={
                    <LoadingOutlined
                        style={{ fontSize: 24, marginBottom: '20px' }}
                        spin
                    />
                }
            />
        );
    }

    const data = miningStat
        ? [
              [
                  <>
                      {' '}
                      <TimerIcon />
                      {t('Time spent')}
                  </>,
                  miningStat?.time_spent
                      ? getTimeLeft(miningStat.time_spent)
                      : '-',
              ],
              [
                  <>
                      <DMECoinIcon width={24} height={24} />
                      {t('Available for claim')}
                  </>,
                  getDmeAmount(miningStat?.dme_to_claim || 0),
              ],
              [
                  <>
                      <DMECoinIcon width={24} height={24} />
                      {t('pages.serviceMarket.contract.fee')}
                  </>,
                  getDmeAmount(miningStat.fee_in_dme.toFixed(8)),
              ],
              [
                  <>
                      <DMECoinIcon width={24} height={24} />
                      {t('pages.mining.transferredToYourAccount')}
                  </>,
                  Number(
                      getDmeAmount(miningStat?.dme_to_account || 0).toFixed(8)
                  ),
              ],
          ]
        : [];

    if (miningStat?.rent_fee_counter) {
        data.push([
            <>
                <DMECoinIcon width={24} height={24} />
                {t('Rent fee counter')}
            </>,
            Number(getDmeAmount(miningStat?.rent_fee_counter || 0).toFixed(8)),
        ]);
    }
    return miningStat?.finished ? (
        <KeyValueTable items={data} />
    ) : (
        <Button onClick={calcMining} type="primary">
            {t('pages.mining.calculateMining')}
        </Button>
    );
});
