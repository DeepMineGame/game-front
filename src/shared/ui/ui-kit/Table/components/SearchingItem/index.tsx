import { FC, ReactNode } from 'react';
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
    subText?: string;
    accountName: string;
    contract: { id: number };
    actionButton?: ReactNode;
};

export const SearchingItem: FC<Props> = ({
    text,
    subText,
    accountName,
    className,
    contract,
    actionButton,
}) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const actionBtn = (actionButton && (
        <span className={styles.actionButton}>{actionButton}</span>
    )) || (
        <span className={styles.contractId}>
            <Link to={`/service-market/contract/${contract.id}`}>
                {t('Contract ID')} {contract.id}
            </Link>
        </span>
    );

    const terminateAction = useSmartContractAction({
        action: terminateContract(accountName, contract.id),
        onSignSuccess: reloadPage,
    });

    const handleCancel = async () => {
        await terminateAction();
    };

    return (
        <div className={cn(styles.item, className)}>
            <LoadingOutlined />
            <span className={styles.text}>{text}</span>
            {subText && <span className={styles.subText}>{subText}</span>}
            {actionBtn}
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
