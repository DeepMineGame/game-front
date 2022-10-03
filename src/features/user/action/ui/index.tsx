import React, { FC } from 'react';
import { Badge } from 'antd';
import { useGate, useStore } from 'effector-react';
import { getTimeLeftFromUtc, isUtcDateExpired, useTick } from 'shared';
import { actionsStore, ActionState, UserDto } from 'entities/smartcontract';
import { UserActionGate } from '../model';
import { useActionTitle } from '../hooks/useActionTitle';

type Props = {
    smartContractUserData: UserDto;
    className?: string;
};

const actionsStateToBadgeStatusMap = {
    [ActionState.undefined]: undefined,
    [ActionState.active]: 'processing',
    [ActionState.interrupted]: 'default',
    [ActionState.finished]: 'success',
    [ActionState.claimed]: 'success',
    [ActionState.idle]: 'default',
} as const;

export const UserAction: FC<Props> = ({ smartContractUserData, className }) => {
    useGate(UserActionGate, { searchParam: smartContractUserData.owner });
    const actions = useStore(actionsStore);
    const lastAction = actions && actions[actions.length - 1];
    const mapActionText = useActionTitle();
    const isActionFinished =
        !!lastAction && isUtcDateExpired(lastAction.finishes_at);

    useTick(!!lastAction && !isActionFinished);

    if (lastAction && !isActionFinished) {
        return (
            <div className={className}>
                <Badge
                    status={actionsStateToBadgeStatusMap[lastAction.state]}
                    text={
                        mapActionText[
                            lastAction.type as keyof typeof mapActionText
                        ]
                    }
                />
                {!isActionFinished && (
                    <b>{getTimeLeftFromUtc(lastAction.finishes_at)}</b>
                )}
            </div>
        );
    }

    return null;
};
