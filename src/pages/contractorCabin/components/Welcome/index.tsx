import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

type equipmentType = {
    name: string;
    isAvailable: boolean;
};
interface SignContractProps {
    equipments: equipmentType[];
}

export const Welcome = ({ equipments }: SignContractProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.welcome.title')}
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div
                        className={cn(
                            contractorStyles.description,
                            styles.description
                        )}
                    >
                        {t('pages.contractor.welcome.description')}
                    </div>
                    <div className={styles.buttons}>
                        <div className={cn(contractorStyles.coloredText)}>
                            {t('pages.contractor.welcome.check')}
                        </div>
                        <div className={cn(contractorStyles.coloredText)}>
                            {t('pages.contractor.welcome.goToMarket')}
                        </div>
                    </div>
                </div>
                <div className={styles.equipments}>
                    {equipments.map(({ name, isAvailable }) => (
                        <div className={styles.equipmentLine}>
                            <div className={styles.equipmentName}>{name}</div>
                            <div className={styles.equipmentValue}>
                                {isAvailable ? (
                                    <CheckOutlined />
                                ) : (
                                    <CloseOutlined />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
