import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { State } from '../state';

const UpgradeInProgress: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.upgradeInProgress')}
            content="01:36:35"
        />
    );
};

export { UpgradeInProgress };
