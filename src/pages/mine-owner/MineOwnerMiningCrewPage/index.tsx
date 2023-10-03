import { Page } from 'shared';
import { MineOwnerCrew } from 'features';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const MineOwnerMiningCrewPage: FC = () => {
    const { t } = useTranslation();

    return (
        <Page headerTitle={t('Mine crew').toUpperCase()}>
            <MineOwnerCrew />
        </Page>
    );
};
