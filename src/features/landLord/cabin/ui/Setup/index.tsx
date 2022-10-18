import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { desktopS, Link, useMediaQuery } from 'shared';
import { createOrder, serviceMarket } from 'app/router/paths';
import { ServiceMarketTabIds } from 'app/router/constants';
import { orderFields } from 'entities/order';
import { ContractRole, ContractType } from 'entities/smartcontract';
import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const Setup: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);

    return (
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.setupTitle')}
            </div>
            <div className={cn(commonStyles.description, styles.description)}>
                {t('pages.landLord.cabin.setupDescription')}
            </div>
            <div className={styles.links}>
                <Link
                    to={`${serviceMarket}/tabId=${ServiceMarketTabIds.mineOperation}`}
                >
                    {isDesktop
                        ? t('features.mineOwner.chooseContract')
                        : t('features.mineOwner.choose')}
                </Link>
                <Link
                    to={`${createOrder}?${orderFields.contractType}=${ContractType.landlord_mineowner}&${orderFields.isClient}=${ContractRole.client}`}
                >
                    {isDesktop
                        ? t('features.mineOwner.createContract')
                        : t('features.mineOwner.create')}
                </Link>
            </div>
        </div>
    );
};
