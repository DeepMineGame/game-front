import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useEvent } from 'effector-react';
import {
    ContractorCabinStatus,
    setContractorStatusEvent,
} from 'features/contractor';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    hasShift?: boolean;
}

export const NoEquipments: FC<Props> = ({ hasShift }) => {
    const { t } = useTranslation();
    const setContractorStatus = useEvent(setContractorStatusEvent);

    useEffect(() => {
        setContractorStatus(ContractorCabinStatus.no_equipments);
    }, [setContractorStatus]);

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.noEquipments.title')}
            </div>
            <div
                className={cn(contractorStyles.description, {
                    [styles.descriptionCenter]: hasShift,
                    [styles.description]: !hasShift,
                })}
            >
                {t(
                    `pages.contractor.noEquipments.${
                        hasShift ? 'descriptionShort' : 'description'
                    }`
                )}
            </div>
        </div>
    );
};
