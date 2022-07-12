import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '../../ui';
import styles from '../styles.module.scss';

type Props = { contract: ContractDto; accountName: string };

const ContractorTable: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const mineOwnerData = {
        [t('pages.serviceMarket.contract.wallet')]: contract.executor || '-',
        [t('pages.serviceMarket.contract.contractor')]: (
            <>
                {accountName === contract.executor && (
                    <Tag>{t('components.common.you')}</Tag>
                )}
                <Text className={styles.accent}>
                    {contract.executor || '-'}
                </Text>
            </>
        ),
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.contractor')}
            data={mineOwnerData}
        />
    );
};

export { ContractorTable };
