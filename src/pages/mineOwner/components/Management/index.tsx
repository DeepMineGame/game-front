import { Page } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';

export const MineManagementPage = () => {
    const { t } = useTranslation();

    return (
        <Page headerTitle={t('pages.mining.mining')}>
            <div>123</div>
        </Page>
    );
};
