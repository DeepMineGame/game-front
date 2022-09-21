import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyValueTable, Theme } from 'shared/ui/ui-kit';
import { State } from '../state';
import styles from './styles.module.scss';

const Stats: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.engineersStats')}
            content={null}
            bottom={
                <KeyValueTable
                    className={styles.table}
                    theme={Theme.transparent}
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
