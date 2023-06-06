import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useContractType } from 'entities/contract';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '..';
import { ContractProps } from '../../types';

const MineOwnerTable: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { isMiningContract } = useContractType(contract);

    const executor = isMiningContract ? contract.client : contract.executor;
    const assetId = isMiningContract
        ? contract.client_asset_id
        : contract.executor_asset_id;

    const mineOwnerData = {
        [t('pages.serviceMarket.contract.wallet')]: executor || '-',
        [t('pages.serviceMarket.contract.mineOwner')]: (
            <>
                {accountName === executor && (
                    <Tag>{t('components.common.you')}</Tag>
                )}
                <Text type="primary">{executor || '-'}</Text>
            </>
        ),
        [t('pages.serviceMarket.contract.mine')]: assetId ? (
            <Text type="primary">{`ID${assetId}`}</Text>
        ) : (
            '-'
        ),
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.mineOwner')}
            data={mineOwnerData}
        />
    );
};

export { MineOwnerTable };
