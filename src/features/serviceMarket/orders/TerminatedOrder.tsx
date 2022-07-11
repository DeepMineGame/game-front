import React, { FC } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import {
    DiscordIcon,
    secondsToDate,
    secondsToDays,
    secondsToHour,
} from 'shared';
import { Penalty } from 'features';
import { ContractDto, ContractStatus } from 'entities/smartcontract';
import { TableWithTitle } from '../ui/TableTitle';
import styles from './styles.module.scss';

type Props = { contract: ContractDto };

const TerminatedOrder: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const handleCopy = (data: string) => () => {
        navigator.clipboard.writeText(data);
    };

    const handleOpenDiscord = () => {
        window.open('https://discord.com/');
    };

    const infoData = {
        title: t('pages.serviceMarket.contract.generalInformation'),
        table: {
            [t('pages.serviceMarket.contract.id')]: (
                <div className={styles.contractId}>
                    {contract.id && (
                        <CopyOutlined onClick={handleCopy(`${contract.id}`)} />
                    )}
                    <div>{contract.id ?? '-'}</div>
                </div>
            ),
            [t('pages.serviceMarket.contract.date')]: contract
                ? secondsToDate(contract.create_time)
                : '-',
            [t('pages.serviceMarket.contract.duration')]: contract
                ? `${secondsToDays(
                      contract.finishes_at - contract.create_time
                  )} ${t('components.common.days').toLowerCase()}`
                : '-',
        },
    };

    const operationStartsIn = contract?.start_time
        ? contract.start_time * 1000 - Date.now()
        : undefined;

    const conditionsData = {
        title: t('pages.serviceMarket.contract.conditions'),
        table: {
            [t('pages.serviceMarket.contract.operationStart')]:
                operationStartsIn
                    ? Math.max(secondsToHour(operationStartsIn / 1000), 0)
                    : '-',
            [t('pages.serviceMarket.contract.penalty')]: contract
                ? `${contract.penalty_amount} ${t(
                      'components.common.button.dme'
                  )}`
                : '-',
            [t('pages.serviceMarket.contract.miningTerms')]: '-',
            [t('pages.serviceMarket.contract.fee')]: contract
                ? `${contract.fee_percent} %`
                : '-',
        },
    };

    const landlordData = {
        title: t('pages.serviceMarket.contract.landlord'),
        table: {
            [t('pages.serviceMarket.contract.wallet')]: '-',
            [t('pages.serviceMarket.contract.landlord')]: contract.executor ? (
                <div className={styles.discord}>
                    <DiscordIcon onClick={handleOpenDiscord} />
                    <div>{contract.executor}</div>
                </div>
            ) : (
                '-'
            ),
            [t('pages.serviceMarket.contract.area')]: '-',
        },
    };

    const mineOwnerData = {
        title: t('pages.serviceMarket.contract.mineOwner'),
        table: {
            [t('pages.serviceMarket.contract.wallet')]: '-',
            [t('pages.serviceMarket.contract.mineOwner')]: contract.client ? (
                <div className={styles.discord}>
                    <DiscordIcon />
                    <div>{contract.client}</div>
                </div>
            ) : (
                '-'
            ),
            [t('pages.serviceMarket.contract.mine')]: '-',
        },
    };

    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
                <TableWithTitle title={infoData.title} data={infoData.table} />
                {contract.status === ContractStatus.terminated && (
                    <Penalty contractId={contract.id} />
                )}
            </Col>
            <Col xs={24} md={12}>
                <TableWithTitle
                    title={conditionsData.title}
                    data={conditionsData.table}
                />
            </Col>
            <Col xs={24} md={12}>
                <TableWithTitle
                    title={landlordData.title}
                    data={landlordData.table}
                />
            </Col>
            <Col xs={24} md={12}>
                <TableWithTitle
                    title={mineOwnerData.title}
                    data={mineOwnerData.table}
                />
            </Col>
        </Row>
    );
};

export { TerminatedOrder };
