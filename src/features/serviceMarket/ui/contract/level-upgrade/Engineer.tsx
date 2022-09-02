import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '../..';
import { ContractProps } from '../../../types';

const Engineer: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const member = contract.client;
    // todo: use dynamic values
    const mineOwnerData = {
        [t('pages.serviceMarket.contract.wallet')]: member || '-',
        [t('roles.engineer')]: (
            <>
                {accountName === member && (
                    <Tag>{t('components.common.you')}</Tag>
                )}
                <Text type="primary">{member || '-'}</Text>
            </>
        ),
        [t('pages.serviceMarket.reputation')]: '123',
        [t('pages.serviceMarket.successProbability')]: '95%',
    };

    return <TableWithTitle title={t('roles.engineer')} data={mineOwnerData} />;
};

export { Engineer };
