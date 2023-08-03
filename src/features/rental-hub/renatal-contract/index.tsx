import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { secondsToDays, toLocaleDate } from 'shared';
import { ContractProps } from '../../service-market/types';
import { StatusHeader } from '../../service-market/ui/status-header';
import { TableWithTitle } from '../../service-market';

const RentalContract: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    return (
        <div>
            <StatusHeader contract={contract} />
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
