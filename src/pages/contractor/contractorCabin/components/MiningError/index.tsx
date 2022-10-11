import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useEvent } from 'effector-react';
import { FC, useEffect } from 'react';
import { setContractorStatusEvent } from 'features/contractor';
import contractorStyles from '../../styles.module.scss';
import { CABIN_STATUS } from '../../constants';
import styles from './styles.module.scss';

export const MiningError: FC = () => {
    const { t } = useTranslation();
    const setContractorStatus = useEvent(setContractorStatusEvent);

    useEffect(() => {
        setContractorStatus(CABIN_STATUS.mining_interrupted);
    }, [setContractorStatus]);

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
