import Rive from '@rive-app/react-canvas';
import {
    getTimeLeftFromUtc,
    useAccountName,
    useReloadPage,
    useTick,
} from 'shared';
import { Progress } from 'antd';
import { useGate, useStore } from 'effector-react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useActionName } from 'features/user';
import {
    $indicateActionDetails,
    getActionForIndicate,
    LastActionGate,
} from '../../model';
import styles from './styles.module.scss';

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
        <div className={styles.actionWrapper}>
            <div className={styles.actionName}>
                {actionName}{' '}
                {isFinished && t('components.actionModal.isComplete')}
            </div>
            <div className={styles.progress}>
                {isFinished ? (
                    <div className={styles.controls}>
                        <div
                            onClick={() =>
                                getActionForIndicate({
                                    searchParam: accountName,
                                })
                            }
                        >
                            {t('components.actionModal.hide')}
                        </div>
                        <div className={styles.ok} onClick={reloadPage}>
                            {t('components.actionModal.ok')}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles.timer}>{timeLeft}</div>
                        <Progress
                            percent={100 - timeToPercentage}
                            showInfo={false}
                        />
                        <CheckCircleOutlined className={styles.icon} />
                    </>
                )}
            </div>
            {isFinished ? (
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
};

export const LastActionInProgressChecker = () => {
    const accountName = useAccountName();
    useGate(LastActionGate, { searchParam: accountName });
    const lastAction = useStore($indicateActionDetails);
    const isFinished = Date.now() >= lastAction.finishAt;
    if (isFinished) return null;
    return <ActionProgress />;
};
