import { useStore } from 'effector-react';
import React, { memo, useEffect } from 'react';
import { Loader, useChainAuthContext } from 'shared';
import { useSmartContractAction } from 'features';
import {
    contractorsStore,
    getContractorsEffect,
    calcmining,
} from 'entities/smartcontracts';
import styles from '../../styles.module.scss';

const THREE_SECONDS = 3000;
export const ClaimInfo = memo(() => {
    const contractors = useStore(contractorsStore);

    const user = useChainAuthContext();
    const accountName = user.activeUser?.accountName;
    const calcMining = useSmartContractAction(
        calcmining({ waxUser: accountName || '' })
    );
    const isTimeSpentEmpty =
        contractors?.length && contractors[0]?.time_spent === 0;
    const timeSpent = contractors && contractors[0]?.time_spent;
    const dmeToCalm = contractors && contractors[0]?.real_mined_amount;
    const areaId = contractors && contractors[0].area_id;

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (accountName) {
            interval = setInterval(() => {
                getContractorsEffect({ nickname: accountName });
            }, THREE_SECONDS);
        }
        return () => clearInterval(interval);
    }, [accountName]);

    useEffect(() => {
        if (isTimeSpentEmpty) {
            calcMining();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areaId]);

    if (timeSpent === null) {
        return <Loader />;
    }

    return (
        <div className={styles.data}>
            <div className={styles.line}>
                <div>Time spent</div>
                <div>{timeSpent}</div>
            </div>
            <div className={styles.line}>
                <div>DME collected</div>
                <div>{dmeToCalm}</div>
            </div>
        </div>
    );
});
