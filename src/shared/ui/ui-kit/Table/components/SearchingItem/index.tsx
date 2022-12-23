import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useSmartContractAction } from 'features/hooks';
import { ContractDto, terminateContract } from 'entities/smartcontract';
import { useReloadPage } from 'shared/lib/hooks';
import { Link } from 'shared/ui/ui-kit';
import { Button } from '../../../Button';
import styles from './styles.module.scss';

type Props = {
    className?: string;
    text?: string;
    accountName: string;
    contract: ContractDto;
};

export const SearchingItem: FC<Props> = ({
    text,
    accountName,
    className,
    contract,
}) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const terminateAction = useSmartContractAction({
        action: terminateContract(accountName, contract.id, false),
        onSignSuccess: reloadPage,
    });

    const handleCancel = async () => {
        await terminateAction();
    };

    return (
        <div className={cn(styles.item, className)}>
            <LoadingOutlined />
            <span className={styles.text}>{text}</span>
            <span className={styles.contractId}>
                <Link to={`/service-market/contract/${contract.id}`}>
                    {t('pages.serviceMarket.contract.contractId')} {contract.id}
                </Link>
            </span>
            <Button
                onClick={handleCancel}
                type="ghost"
                className={cn(styles.button)}
            >
                {t('components.common.button.cancel')}
            </Button>
        </div>
    );
};
