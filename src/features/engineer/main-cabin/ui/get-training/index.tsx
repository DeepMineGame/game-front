import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { State } from '../state';

const GetTraining: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.getTraining')}
            content={t('pages.engineer.nowYouNeedTraining')}
        />
    );
};

export { GetTraining };
