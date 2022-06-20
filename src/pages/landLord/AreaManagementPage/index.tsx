import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'shared';
import { AreaClaim } from 'features';

export const AreaManagementPage = () => {
    const { t } = useTranslation();

    return (
        <Page headerTitle={t('pages.areaManagement.title')}>
            <AreaClaim />
        </Page>
    );
};
