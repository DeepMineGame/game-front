import React, { FC } from 'react';
import { Col, Row, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { secondsToDays, toLocaleDate } from 'shared';
import { PageHeader } from '@ant-design/pro-components';
import { ContractProps } from '../../service-market/types';
import { TableWithTitle } from '../../service-market';
import { getColorForFrontStatus, getFrontStatus } from './lib/getFrontStatus';
import { useButtons } from './lib/useButtons';

const RentalContract: FC<ContractProps> = ({ contract }) => {
    const { t } = useTranslation();
    const frontStatus = getFrontStatus(contract);
    const button = useButtons(frontStatus, contract);
    return (
        <div>
            <PageHeader
                style={{
                    marginBottom: '20px',
                    border: `1px solid ${getColorForFrontStatus(frontStatus)}`,
                }}
                ghost={false}
                extra={[button]}
                title={
                    <span
                        style={{
                            color: getColorForFrontStatus(frontStatus),
                        }}
                    >
                        {frontStatus}
                    </span>
                }
            />
            <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            {/* <GeneralDataTable */}
                            {/*    contract={contract} */}
                            {/*    accountName={accountName} */}
                            {/* /> */}
                            <TableWithTitle
                                title={t('General information')}
                                data={{
                                    [t('Contract ID')]: contract.id,
                                    [t('Status')]: String(
                                        contract.status
                                    ).replaceAll('_', ' '),

                                    [t('Creation date')]: toLocaleDate(
                                        contract.create_time
                                    ),
                                    [t('Duration')]: `${secondsToDays(
                                        contract.contract_duration
                                    )} ${t('Days').toLowerCase()}`,
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('Conditions')}
                        data={{
                            [t('Rental fee')]: contract.fee_percent,
                            [t('Minimum Fee')]: contract.fee_min_amount,
                            [t('Fee paid')]: contract.fee_counter,
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('Owner')}
                        data={{
                            [t('Owner')]: contract.owner,
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('Renter')}
                        data={{
                            [t('Renter')]: contract.renter,
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Table
                        columns={[
                            {
                                title: 'Item',
                                dataIndex: 'type',
                                key: 'type',
                            },
                            {
                                title: 'Id',
                                dataIndex: 'id',
                                key: 'id',
                            },
                        ]}
                        dataSource={contract.assets?.map(
                            ({ type, asset_id }) => ({
                                type: type.replaceAll('_', ' '),
                                id: asset_id,
                            })
                        )}
                        pagination={false}
                    />
                </Col>
                {/* <Col xs={24} md={12}> */}
                {/*    <Row gutter={[32, 32]}> */}
                {/*        <Col span={24}> */}
                {/*            <MineOwnerTable */}
                {/*                contract={contract} */}
                {/*                accountName={accountName} */}
                {/*            /> */}
                {/*        </Col> */}
                {/*    </Row> */}
                {/* </Col> */}
            </Row>
        </div>
    );
};
export { RentalContract };
