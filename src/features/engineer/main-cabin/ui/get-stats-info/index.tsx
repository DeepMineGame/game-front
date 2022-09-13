import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { State } from '../state';

const GetStatsInfo: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.getStatsInfo')}
            content={t('pages.engineer.nowCanSeeStats')}
        />
    );
};

export { GetStatsInfo };
