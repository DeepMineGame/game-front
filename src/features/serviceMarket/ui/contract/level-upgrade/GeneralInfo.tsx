import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShareAltOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { secondsToDays, Text, toLocaleDate } from 'shared/ui';
import { ContractState } from '../../index';
import { TableWithTitle } from '../..';
import { ContractProps } from '../../../types';

type Props = {
    isOrder?: boolean;
} & ContractProps;

const GeneralInfo: FC<Props> = ({ contract, accountName, isOrder = false }) => {
    const { t } = useTranslation();

    // todo: is order and created by citizen || is contract
    const showNft = (isOrder && contract.client === accountName) || !isOrder;

    // todo: use dynamic values
    const generalData = {
        [t(
            isOrder
                ? 'pages.serviceMarket.order.orderId'
                : 'pages.serviceMarket.contract.contractId'
        )]: (
            <Tooltip trigger="click" overlay={t('pages.info.copied')}>
                <div>
                    <Space size={10}>
                        <Text type="white">{contract.id}</Text>
                        <ShareAltOutlined
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    window.location.href
                                )
                            }
                        />
                    </Space>
                </div>
            </Tooltip>
        ),
        ...(!isOrder && {
            [t('pages.serviceMarket.status')]: (
                <ContractState contract={contract} accountName={accountName} />
            ),
        }),
        [t('pages.serviceMarket.creationDate')]: toLocaleDate(
            contract.create_time * 1000
        ),
        [t('components.common.duration')]: `${secondsToDays(
            contract.contract_duration
        )} ${t('components.common.days').toLowerCase()}`,
        ...(showNft && {
            [t('pages.serviceMarket.nftId')]: (
                <Text type="primary">345663</Text>
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
