import { useStore } from 'effector-react';
import React from 'react';
import { userStore, toggleMining } from 'entities/user';
import { MainActionButton } from 'shared/ui';

export function ToggleMining() {
    const user = useStore(userStore);

    return (
        <MainActionButton onClick={toggleMining}>
            {user?.isMining ? 'Stop Mining' : 'Mine DME'}
        </MainActionButton>
    );
}
