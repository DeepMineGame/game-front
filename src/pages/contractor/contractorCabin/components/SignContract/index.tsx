import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Button, Title } from 'shared';
import { useNavigate } from 'react-router-dom';
import { createOrder, serviceMarket } from 'app/router/paths';
import { ServiceMarketTabIds } from 'app/router/constants';
import { FC } from 'react';
import {
    ContractRole,
    ContractType,
    createContrFormFields,
} from 'entities/smartcontract';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const SignContract: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Title
                level={3}
                className={cn(contractorStyles.title, styles.title)}
            >
                {t('pages.contractor.signingContract.title')}
            </Title>
            <div
                className={cn(contractorStyles.description, styles.description)}
            >
                {t('pages.contractor.signingContract.description')}
            </div>
            <div className={styles.buttons}>
                <Button
                    type="primary"
                    ghost
                    className={cn(contractorStyles.coloredText)}
                    onClick={() =>
                        navigate(
                            `${serviceMarket}?tabId=${ServiceMarketTabIds.miningContracts}`
                        )
                    }
                >
                    {t('pages.contractor.signingContract.findButton')}
                </Button>
                <Button
                    className={cn(contractorStyles.coloredText)}
                    ghost
                    type="primary"
                    onClick={() =>
                        navigate(
                            `${createOrder}?${createContrFormFields.contractType}=${ContractType.mineowner_contractor}&${createContrFormFields.isClient}=${ContractRole.executor}`
                        )
                    }
                >
                    {t('pages.contractor.signingContract.createButton')}
                </Button>
            </div>
        </div>
    );
};
