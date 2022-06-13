import React, { FC } from 'react';
import { Badge } from 'antd';
import { useGate, useStore } from 'effector-react';
import {
    actionsStore,
    ActionState,
    ActionType,
    UserDto,
} from 'entities/smartcontract';
import { UserActionGate } from '../model';

type Props = {
    smartContractUserData: UserDto;
};

const actionsStateToBadgeStatusMap = {
    [ActionState.undefined]: undefined,
    [ActionState.active]: 'processing' as const,
    [ActionState.interrupted]: 'default' as const,
    [ActionState.finished]: 'success' as const,
    [ActionState.claimed]: 'success' as const,
    [ActionState.idle]: 'default' as const,
};

export const UserAction: FC<Props> = ({ smartContractUserData }) => {
    useGate(UserActionGate, { searchParam: smartContractUserData.owner });
    const actions = useStore(actionsStore);
    const lastAction = actions && actions[actions.length - 1];
    const mapActionText = {
        [ActionType.mine]: 'mine',
        [ActionType.mine_activation]: 'mine deactivation',
        [ActionType.mine_deactivation]: 'mine activation',
        [ActionType.mine_setup]: 'mine setup',
        [ActionType.mine_unsetup]: 'mine unsetup',
        [ActionType.physical_shift]: 'physical shift',
        [ActionType.undefined]: null,
    };

    if (lastAction) {
        return (
            <Badge
                status={actionsStateToBadgeStatusMap[lastAction.state]}
                text={mapActionText[lastAction.type]}
            />
        );
    }
    return null;
};
