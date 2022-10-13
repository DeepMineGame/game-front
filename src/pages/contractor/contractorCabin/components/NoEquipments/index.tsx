import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { $inLocation } from 'features/contractor';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const NoEquipments: FC = () => {
    const { t } = useTranslation();
    const inLocation = useStore($inLocation);

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.noEquipments.title')}
            </div>
            <div
                className={cn(contractorStyles.description, {
                    [styles.descriptionCenter]: inLocation,
                    [styles.description]: !inLocation,
                })}
            >
                {t(
                    `pages.contractor.noEquipments.${
                        inLocation ? 'descriptionShort' : 'description'
                    }`
                )}
            </div>
        </div>
    );
};
