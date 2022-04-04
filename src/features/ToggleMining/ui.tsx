import { useStore } from 'effector-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { userStore, toggleMining } from 'entities/user';
import { MainActionButton } from 'shared/ui';

export const ToggleMining = () => {
    const user = useStore(userStore);
    const { t } = useTranslation();

    return (
        <MainActionButton onClick={toggleMining}>
            {user?.isMining ? t('Stop Mining') : t('Mine DME')}
        </MainActionButton>
    );
};
