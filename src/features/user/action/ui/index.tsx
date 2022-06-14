import React, { FC } from 'react';
import { Badge } from 'antd';
import { useGate, useStore } from 'effector-react';
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
    if (lastAction) {
        return (
            <div className={className}>
                <Badge
                    status={actionsStateToBadgeStatusMap[lastAction.state]}
                    text={mapActionText[lastAction.type]}
                />
            </div>
        );
    }
    return null;
};
