import Rive from '@rive-app/react-canvas';
import {
    getTimeLeftFromUtc,
    neutral3Color,
    primary6,
    useAccountName,
    useReloadPage,
    useTick,
} from 'shared';
import { Progress } from 'antd';
import { useGate, useStore } from 'effector-react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useActionName } from 'features/user';
import {
    $indicateActionDetails,
    getActionForIndicate,
    LastActionGate,
} from '../../model';
import styles from './styles.module.scss';

export function ProgressNotification(props: {
    actionName: string | null;
    finished: boolean;
    finishText: string;
    onHideClick: () => any;
    onOkClick: () => any;
    timeLeft: string;
    timeToPercentage: number;
    className?: string;
}) {
    const { t } = useTranslation();

    return (
        <div className={cn(styles.actionWrapper, props.className)}>
            <div className={styles.actionName}>
                {props.actionName} {props.finished && props.finishText}
            </div>
            <div className={styles.progress}>
                {props.finished ? (
                    <div className={styles.controls}>
                        <div onClick={props.onHideClick}>
                            {t('components.actionModal.hide')}
                        </div>
                        <div className={styles.ok} onClick={props.onOkClick}>
                            {t('components.actionModal.ok')}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles.timer}>{props.timeLeft}</div>
                        <Progress
                            percent={100 - props.timeToPercentage}
                            showInfo={false}
                            strokeColor={primary6}
                            trailColor={neutral3Color}
                        />
                        <CheckCircleOutlined className={styles.icon} />
                    </>
                )}
            </div>
            {props.finished ? (
                // raw source - https://codepen.io/snappyrogue/pen/xxzNdbN
                <svg
                    width="204"
                    height="59"
                    viewBox="0 0 204 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className={styles.successSvg}
                        d="M204 16.9091L192.56 5.41893H19.8L14.91 0H0V52.4672L6.51001 59H204V16.9091Z"
                        fill="#1B1B1B"
                    />
                </svg>
            ) : (
                <Rive src="/animations/action.riv" />
            )}
        </div>
    );
}

export const ActionProgress = () => {
    const accountName = useAccountName();
    const lastAction = useStore($indicateActionDetails);
    const isFinished = Date.now() >= lastAction.finishAt;
    const reloadPage = useReloadPage();
    const { t } = useTranslation();
    const timeLeft = lastAction.finishAt
        ? getTimeLeftFromUtc(lastAction.finishAt / 1000)
        : '';

    const timeToPercentage = Math.floor(
        ((lastAction.finishAt - Date.now()) /
            lastAction.initialAmountOfSeconds) *
            100
    );

    const actionName = useActionName(lastAction.actionType);

    useTick(!isFinished);

    return (
        <ProgressNotification
            actionName={actionName}
            finished={isFinished}
            finishText={t('components.actionModal.isComplete')}
            onHideClick={reloadPage}
            onOkClick={reloadPage}
            timeLeft={timeLeft}
            timeToPercentage={timeToPercentage}
        />
    );
};

export const LastActionInProgressChecker = () => {
    const accountName = useAccountName();
    useGate(LastActionGate, { searchParam: accountName });
    const lastAction = useStore($indicateActionDetails);
    const isFinished = Date.now() >= lastAction.finishAt;
    if (isFinished) return null;
    return <ActionProgress />;
};
