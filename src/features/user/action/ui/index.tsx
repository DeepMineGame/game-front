import { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { getTimeLeftFromUtc, useAccountName, useTick, Text } from 'shared';
import {
    $indicateActionDetails,
    LastActionGate,
} from 'features/action-indicator';
import { useActionName } from '../hooks/useActionName';
import styles from './styles.module.scss';

export const UserAction: FC = () => {
    useGate(LastActionGate, { searchParam: useAccountName() });
    const lastAction = useStore($indicateActionDetails);
    const isFinished = Date.now() >= lastAction.finishAt;
    const actionName = useActionName(lastAction.actionType);

    useTick(!isFinished);

    if (isFinished) return null;

    return (
        <div className={styles.root}>
            <Text>{actionName}</Text>
            <b>{getTimeLeftFromUtc(lastAction.finishAt / 1000)}</b>
        </div>
    );
};
