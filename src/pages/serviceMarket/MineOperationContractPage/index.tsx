import React, { FC } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { DiscordIcon, KeyValueTable, Page, Title } from 'shared';
import { Penalty } from 'features';

import styles from './styles.module.scss';

interface TableProps {
    title: string;
    data: Record<string, string | React.ReactNode>;
}

const TableWithTitle: FC<TableProps> = ({ title, data }) => {
    return (
        <div className={styles.table}>
            <Title fontFamily="orbitron" level={5} className={styles.title}>
                {title}
            </Title>
            <KeyValueTable items={data} />
        </div>
    );
};

export const MineOperationContractPage = () => {
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
                    <CopyOutlined onClick={handleCopy('457457')} />
                    <div>457457</div>
                </div>
            ),
            [t('pages.serviceMarket.contract.date')]:
                new Date().toLocaleDateString(),
            [t('pages.serviceMarket.contract.duration')]: '21 days',
        },
    };

    const conditionsData = {
        title: t('pages.serviceMarket.contract.conditions'),
        table: {
            [t('pages.serviceMarket.contract.operationStart')]: '24 hours',
            [t('pages.serviceMarket.contract.penalty')]: '10 DME',
            [t('pages.serviceMarket.contract.miningTerms')]:
                'Minimum 5 DME in 7 Days',
            [t('pages.serviceMarket.contract.fee')]: '5%',
        },
    };

    const landlordData = {
        title: t('pages.serviceMarket.contract.landlord'),
        table: {
            [t('pages.serviceMarket.contract.wallet')]: 'Wkfuknf.wam',
            [t('pages.serviceMarket.contract.landlord')]: (
                <div className={styles.discord}>
                    <DiscordIcon onClick={handleOpenDiscord} />
                    <div>Skyfidelity</div>
                </div>
            ),
            [t('pages.serviceMarket.contract.area')]: 'ID368530',
        },
    };

    const mineOwnerData = {
        title: t('pages.serviceMarket.contract.mineOwner'),
        table: {
            [t('pages.serviceMarket.contract.wallet')]: 'Ljfekj.wam',
            [t('pages.serviceMarket.contract.mineOwner')]: (
                <div className={styles.discord}>
                    <DiscordIcon />
                    <div>Stranglethorn</div>
                </div>
            ),
            [t('pages.serviceMarket.contract.mine')]: 'ID368530',
        },
    };

    return (
        <Page
            headerTitle={t('pages.serviceMarket.contract.title').toUpperCase()}
        >
            <div className={styles.generalSection}>
                <div className={styles.table}>
                    <TableWithTitle
                        title={infoData.title}
                        data={infoData.table}
                    />
                    <Penalty />
                </div>
                <TableWithTitle
                    title={conditionsData.title}
                    data={conditionsData.table}
                />
            </div>
            <div className={styles.additionalSection}>
                <TableWithTitle
                    title={landlordData.title}
                    data={landlordData.table}
                />
                <TableWithTitle
                    title={mineOwnerData.title}
                    data={mineOwnerData.table}
                />
            </div>
        </Page>
    );
};
