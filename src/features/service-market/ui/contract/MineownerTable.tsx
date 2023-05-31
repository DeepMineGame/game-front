import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from 'antd';
import { useContractType } from 'entities/contract';
import { normalizeAttrs } from 'entities/smartcontract';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '..';
import { ContractProps } from '../../types';

const SUB_LEVELS_MAX_AMOUNT = 5;

const MineOwnerTable: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { isMiningContract } = useContractType(contract);
    const subLevel = normalizeAttrs(contract.attrs).mine_sublevel;
    const mineSubLevelToPercent =
        subLevel &&
        Number(subLevel) > 0 &&
        ((Number(subLevel) + 1) / SUB_LEVELS_MAX_AMOUNT) * 100;
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
        [t('Mine level')]: contract.computed?.mine_level || 0,
        [t('Mine sublevel')]: (
            <Progress
                percent={mineSubLevelToPercent || 25}
                steps={5}
                showInfo={false}
            />
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
