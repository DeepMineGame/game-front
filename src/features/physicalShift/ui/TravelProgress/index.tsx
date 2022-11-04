import Rive from '@rive-app/react-canvas';
import {
    getTimeLeftFromUtc,
    HiveOutlined,
    MineOutlined,
    useAccountName,
    useTick,
} from 'shared';
import { Progress } from 'antd';
import { useGate, useStore } from 'effector-react';
import { ShiftGate, $travelStatus } from '../../model';
import styles from './styles.module.scss';

export const TravelProgress = () => {
    const accountName = useAccountName();
    useGate(ShiftGate, { searchParam: accountName });
    const travelStatus = useStore($travelStatus);

    const timeLeft = travelStatus.finishAt
        ? getTimeLeftFromUtc(travelStatus.finishAt / 1000)
        : '';

    const isFinished = Date.now() >= travelStatus.finishAt;

    const timeToPercentage = Math.floor(
        ((travelStatus.finishAt - Date.now()) /
            travelStatus.initialAmountOfSeconds) *
            100
    );

    useTick(!isFinished);
    if (isFinished) return null;

    return (
        <div className={styles.travelProgressWrapper}>
            <div className={styles.timer}>Traveling {timeLeft}</div>
            <div className={styles.progress}>
                <HiveOutlined className={styles.icon} />
                <Progress percent={100 - timeToPercentage} showInfo={false} />
                <MineOutlined className={styles.icon} />
            </div>

            <Rive src="/animations/shift_animation.riv" />
        </div>
    );
};
