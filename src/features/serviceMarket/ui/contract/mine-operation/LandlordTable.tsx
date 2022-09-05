import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '../..';
import { ContractProps } from '../../../types';

const LandlordTable: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const landlordData = {
        [t('pages.serviceMarket.contract.wallet')]: contract.client || '-',
        [t('pages.serviceMarket.contract.landlord')]: (
            <>
                {accountName === contract.client && (
                    <Tag>{t('components.common.you')}</Tag>
                )}
                <Text type="primary">{contract.client || '-'}</Text>
            </>
        ),
        [t('pages.serviceMarket.contract.area')]: (
            <Text type="primary">{`ID${contract.client_asset_id}`}</Text>
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
