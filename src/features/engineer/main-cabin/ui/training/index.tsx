import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyValueTable } from 'shared/ui/ui-kit';
import { State } from '../state';

const Training: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.engineersTraining')}
            content={
                <KeyValueTable
                    items={{
                        [t('pages.engineer.engineersLevel')]: '1/9',
                        [t('pages.engineer.upgradesUnlocked')]: 123,
                    }}
                />
            }
        />
    );
};

export { Training };
