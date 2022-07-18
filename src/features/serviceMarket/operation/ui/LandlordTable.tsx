import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '../../ui';
import styles from '../styles.module.scss';

type Props = { contract: ContractDto; accountName: string };

const LandlordTable: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const landlordData = {
        [t('pages.serviceMarket.contract.wallet')]: contract.client || '-',
        [t('pages.serviceMarket.contract.landlord')]: (
            <>
                {accountName === contract.client && (
                    <Tag>{t('components.common.you')}</Tag>
                )}
                <Text className={styles.accent}>{contract.client || '-'}</Text>
            </>
        ),
        [t('pages.serviceMarket.contract.area')]: (
            <Text
                className={styles.accent}
            >{`ID${contract.client_asset_id}`}</Text>
        ),
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.landlord')}
            data={landlordData}
        />
    );
};

export { LandlordTable };
