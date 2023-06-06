import React, { FC, useMemo, useRef, useState } from 'react';
import { Alert, Col, Modal, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isEngineerRequestedReport } from 'features/engineer';
import { ContractDto, normalizeAttrs } from 'entities/smartcontract';
import { getReport } from 'entities/engineer';

import { Button, Text } from 'shared/ui/ui-kit';
import { getUpgradeType } from 'shared/lib/utils';
import { green6 } from 'shared/ui/variables';
import { BrokenIcon } from 'shared/ui/icons';
import { StatusTypes } from './types';
import styles from './styles.module.scss';
import { getDataSource } from './lib/getDataSource';
import { getAlertMessages, getFinishedBy } from './lib';
import { buildImagePath } from './lib/buildImagePath';

type Props = {
    accountName: string;
    contract: ContractDto;
    onReport?(): void;
    onClose?(): void;
};

const typeMap: StatusTypes = {
    success: 'success',
    failed: 'warning',
    failed_with_broke: 'error',
};

const UpgradeReport: FC<Props> = ({
    contract,
    accountName,
    onReport,
    onClose,
}) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const reportRequested = useRef(isEngineerRequestedReport(contract));

    const handleReport = async () => {
        setIsVisible(true);

        if (!reportRequested.current && contract.executor === accountName) {
            await getReport(contract.id);
            reportRequested.current = true;
        }

        onReport?.();
    };

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };
    const upgradeType = getUpgradeType({ contract });
    const { status } = normalizeAttrs(contract.attrs || []);

    const isBroken = status === 'failed_with_broke';
    const isSuccess = status === 'success';

    const alertMessages = getAlertMessages(
        contract,
        accountName,
        getFinishedBy(contract)
    );

    const showAlert = alertMessages && status;

    const dataSource = getDataSource(contract);

    const columns: ColumnsType<any> = useMemo(
        () => [
            {
                dataIndex: 'icon',
                width: 56,
                render: (Icon: React.ForwardRefExoticComponent<any>) => (
                    <Icon
                        style={{ fontSize: '21px', verticalAlign: 'middle' }}
                    />
                ),
            },
            {
                dataIndex: 'title',
                render: t,
            },
            {
                dataIndex: 'value',
                align: 'right',
                render: (value, { key }) => {
                    const isExperience = key === 'exp';
                    return (
                        <Text bold type={isExperience ? 'success' : undefined}>
                            {isExperience && '+'} {value}
                        </Text>
                    );
                },
            },
        ],
        [t]
    );

    return (
        <>
            <Button onClick={handleReport} block type="primary">
                {t('pages.engineer.getReport')}
            </Button>

            <Modal
                closable={false}
                visible={isVisible}
                title={
                    <Text bold size="md">
                        {t(
                            `pages.engineer.upgrade.${
                                isSuccess ? 'success' : 'unsuccess'
                            }`
                        )}
                    </Text>
                }
                footer={[
                    <Button key="ok" type="primary" onClick={handleClose}>
                        Ok
                    </Button>,
                ]}
            >
                <Row gutter={20} className={styles.row}>
                    <Col span={6}>
                        <div className={styles.left}>
                            <div className={styles.preview}>
                                <img
                                    height="100%"
                                    width="100%"
                                    src={buildImagePath(contract)}
                                    alt="upgraded template"
                                />
                            </div>
                            <Text block size="xs" className={styles.type}>
                                {t(
                                    `pages.serviceMarket.levelUpgradeTab.type.${upgradeType}`
                                )}
                            </Text>
                            {isSuccess && (
                                <div className={styles.label}>
                                    <DoubleRightOutlined
                                        rotate={-90}
                                        style={{
                                            color: green6,
                                            fontSize: '16px',
                                        }}
                                    />{' '}
                                    {t('pages.engineer.upgrade.upgraded')}
                                </div>
                            )}
                            {isBroken && (
                                <div className={styles.label}>
                                    <BrokenIcon /> {t('kit.statuses.broken')}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col span={18}>
                        <Table
                            className={styles.table}
                            bordered={false}
                            showHeader={false}
                            pagination={false}
                            tableLayout="fixed"
                            columns={columns}
                            dataSource={dataSource}
                        />
                    </Col>
                </Row>
                {showAlert && (
                    <Alert
                        showIcon
                        type={typeMap[status]}
                        message={alertMessages[status]
                            .map((text) =>
                                text === 'Equipment'
                                    ? t(
                                          `pages.serviceMarket.levelUpgradeTab.type.${upgradeType}`
                                      )
                                    : t(`pages.engineer.upgrade.${text}`)
                            )
                            .join(' ')}
                    />
                )}
            </Modal>
        </>
    );
};

export { UpgradeReport };
