import Rive from '@rive-app/react-canvas';
import {
    getTimeLeftFromUtc,
    useAccountName,
    useReloadPage,
    useTick,
} from 'shared';
import { Modal, Progress } from 'antd';
import { useGate, useStore } from 'effector-react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useActionName } from 'features/user';
import { LastActionGate, $indicateActionDetails } from '../../model';
import styles from './styles.module.scss';

export const ActionProgress = () => {
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

    if (isFinished) {
        Modal.info({
            title: t('components.actionModal.lastActionSuccess'),
            content: t('components.actionModal.needRefreshPage'),
            onOk: reloadPage,
        });
    }
    return (
        <div className={styles.actionWrapper}>
            <div className={styles.actionName}>{actionName}</div>
            <div className={styles.progress}>
                {!isFinished && <div className={styles.timer}>{timeLeft}</div>}
                <Progress percent={100 - timeToPercentage} showInfo={false} />
                <CheckCircleOutlined
                    className={isFinished ? styles.successIcon : styles.icon}
                />
            </div>
            <Rive src="/animations/action.riv" />
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
