import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyValueTable } from 'shared/ui/ui-kit';
import { State } from '../state';

const Stats: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.engineersStats')}
            content={null}
            bottom={
                <KeyValueTable
                    items={{
                        [t('pages.engineer.dmePerUpgrade')]: 9999,
                        [t('pages.engineer.dmeTotal')]: 9867564,
                    }}
                />
            }
        />
    );
};

export { Stats };
