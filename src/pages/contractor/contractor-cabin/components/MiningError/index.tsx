import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { FC } from 'react';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const MiningError: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.miningError.title')}
            </div>
            <div
                className={cn(contractorStyles.description, styles.description)}
            >
                {t('pages.contractor.miningError.description')}
            </div>
        </div>
    );
};
