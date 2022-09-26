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
    [ActionState.active]: 'processing' as const,
    [ActionState.interrupted]: 'default' as const,
    [ActionState.finished]: 'success' as const,
    [ActionState.claimed]: 'success' as const,
    [ActionState.idle]: 'default' as const,
};

export const UserAction: FC<Props> = ({ smartContractUserData, className }) => {
    useGate(UserActionGate, { searchParam: smartContractUserData.owner });
    const actions = useStore(actionsStore);
    const lastAction = actions && actions[actions.length - 1];
    const mapActionText = useActionTitle();
    const isActionFinished =
        !!lastAction && isUtcDateExpired(lastAction.finishes_at);

    useTick(!!lastAction && !isActionFinished);

    if (lastAction) {
        const status = isActionFinished
            ? ActionState.finished
            : lastAction.state;

        return (
            <div className={className}>
                <Badge
                    status={actionsStateToBadgeStatusMap[status]}
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
