import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { Tag, Text } from 'shared/ui';
import { TableWithTitle } from '../../ui';
import styles from '../styles.module.scss';

type Props = {
    contract: ContractDto;
    accountName: string;
    isMiningContract: boolean;
};

const MineOwnerTable: FC<Props> = ({
    contract,
    accountName,
    isMiningContract,
}) => {
    const { t } = useTranslation();

    const executor = isMiningContract ? contract.client : contract.executor;
    const asset_id = isMiningContract
        ? contract.client_asset_id
        : contract.executor_asset_id;

    const mineOwnerData = {
        [t('pages.serviceMarket.contract.wallet')]: executor || '-',
        [t('pages.serviceMarket.contract.mineOwner')]: (
            <>
                {accountName === executor && (
                    <Tag>{t('components.common.you')}</Tag>
                )}
                <Text className={styles.accent}>{executor || '-'}</Text>
            </>
        ),
        [t('pages.serviceMarket.contract.mine')]: asset_id ? (
            <Text className={styles.accent}>{`ID${asset_id}`}</Text>
        ) : (
            '-'
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
