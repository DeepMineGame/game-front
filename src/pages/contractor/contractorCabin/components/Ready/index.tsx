import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useEvent } from 'effector-react';
import {
    ContractorCabinStatus,
    setContractorStatusEvent,
} from 'features/contractor';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const Ready = () => {
    const { t } = useTranslation();
    const setContractorStatus = useEvent(setContractorStatusEvent);

    useEffect(() => {
        setContractorStatus(ContractorCabinStatus.ready);
    }, [setContractorStatus]);

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.ready.title')}
            </div>
            <div
                className={cn(contractorStyles.description, styles.description)}
            >
                {t('pages.contractor.ready.description')}
            </div>
        </div>
    );
};
