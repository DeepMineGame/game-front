import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShareAltOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { Text, toLocaleDate } from 'shared/ui';
import { TableWithTitle } from '../..';
import { ContractProps } from '../../../types';

type Props = ContractProps;

const GeneralInfo: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const generalData = {
        [t('Contract ID')]: (
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
        <TableWithTitle title={t('General information')} data={generalData} />
    );
};

export { GeneralInfo };
