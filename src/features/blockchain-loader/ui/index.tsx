import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EliteDangerousLoader } from './components/ElitDangerousLoader';
import styles from './styles.module.scss';

export const BlockchainLoader: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.blockchainConnection}>
            {t('features.connectToBlockchain')} <EliteDangerousLoader />
        </div>
    );
};
