import { useStore } from 'effector-react';
import { actionsStore } from 'features';
import { ActionType } from 'entities/smartcontract';

export const useActions = (actionType: ActionType) => {
    const actions = useStore(actionsStore);
    const filteredActions = actions?.filter(({ type }) => type === actionType);
    const lastAction = filteredActions?.reverse()?.[0];

    return {
        filteredActions,
        lastAction,
    };
};
