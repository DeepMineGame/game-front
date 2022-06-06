import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { desktopS, useMediaQuery, Line } from 'shared';
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
    const isDesktop = useMediaQuery(desktopS);

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
                        {isDesktop
                            ? t('pages.contractor.welcome.description')
                            : t('pages.contractor.welcome.descriptionMobile')}
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
                {isDesktop && (
                    <div className={styles.equipments}>
                        {equipments.map(({ name, isAvailable }) => (
                            <Line className={styles.equipmentLine} key={name}>
                                <div className={styles.equipmentName}>
                                    {name}
                                </div>
                                <div className={styles.equipmentValue}>
                                    {isAvailable ? (
                                        <CheckOutlined />
                                    ) : (
                                        <CloseOutlined />
                                    )}
                                </div>
                            </Line>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
