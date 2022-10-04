import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '../..';
import { ContractProps } from '../../../types';

const Citizen: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const member = contract.client;

    const mineOwnerData = {
        [t('pages.serviceMarket.contract.wallet')]: member || '-',
        [t('roles.citizen')]: (
            <>
                {accountName === member && (
                    <Tag>{t('components.common.you')}</Tag>
                )}
                <Text type="primary">{member || '-'}</Text>
            </>
        ),
    };

    return <TableWithTitle title={t('roles.citizen')} data={mineOwnerData} />;
};

export { Citizen };
