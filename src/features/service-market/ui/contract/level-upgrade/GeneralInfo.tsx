import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShareAltOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { Text, toLocaleDate } from 'shared/ui';
import { TableWithTitle, UpgradeContractState } from '../..';
import { ContractProps } from '../../../types';

type Props = {
    isOrder?: boolean;
} & ContractProps;

const GeneralInfo: FC<Props> = ({ contract, accountName, isOrder = false }) => {
    const { t } = useTranslation();

    const generalData = {
        [t(
            isOrder
                ? 'pages.serviceMarket.order.orderId'
                : 'pages.serviceMarket.contract.contractId'
        )]: (
            <div>
                <Space size={10}>
                    <Text type="white">{contract.id}</Text>
                    <Tooltip trigger="click" overlay={t('pages.info.copied')}>
                        <ShareAltOutlined
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    window.location.href
                                )
                            }
                        />
                    </Tooltip>
                </Space>
            </div>
        ),

        ...(!isOrder && {
            [t('pages.serviceMarket.status')]: (
                <UpgradeContractState
                    contract={contract}
                    accountName={accountName}
                />
            ),
        }),
        [t('pages.serviceMarket.creationDate')]: toLocaleDate(
            contract.create_time * 1000
        ),
        ...(!!contract.client_asset_id && {
            [t('pages.serviceMarket.nftId')]: (
                <Text type="primary">{contract.client_asset_id}</Text>
            ),
        }),
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.generalInformation')}
            data={generalData}
        />
    );
};

export { GeneralInfo };