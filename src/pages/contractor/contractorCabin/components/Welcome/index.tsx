import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { desktopS, useMediaQuery } from 'shared';
import { useNavigate } from 'react-router-dom';
import { warehouse } from 'app/router/paths';
import { ATOMICHUB_URL } from 'app';
import { EquipmentTable, equipmentType } from '../EquipmentTable';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

interface SignContractProps {
    equipments: equipmentType[];
}

export const Welcome = ({ equipments }: SignContractProps) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const navigate = useNavigate();

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
                        <div
                            className={cn(contractorStyles.coloredText)}
                            onClick={() => navigate(warehouse)}
                        >
                            {t('pages.contractor.welcome.check')}
                        </div>
                        <div
                            className={cn(contractorStyles.coloredText)}
                            onClick={() => window.open(ATOMICHUB_URL, '_blank')}
                        >
                            {t('pages.contractor.welcome.goToMarket')}
                        </div>
                    </div>
                </div>
                {isDesktop && <EquipmentTable equipments={equipments} />}
            </div>
        </div>
    );
};
