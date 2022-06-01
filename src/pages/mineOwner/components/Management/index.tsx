import { Page } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { MineControlPanel } from 'features';

export const MineManagementPage = () => {
    const { t } = useTranslation();

    return (
        <Page headerTitle={t('pages.mineManagement.title')}>
            <MineControlPanel />
        </Page>
    );
};
