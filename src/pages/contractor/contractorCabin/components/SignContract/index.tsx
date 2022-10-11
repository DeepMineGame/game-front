import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Button } from 'shared';
import { useNavigate } from 'react-router-dom';
import { createOrder, serviceMarket } from 'app/router/paths';
import { ServiceMarketTabIds } from 'app/router/constants';
import { useEvent } from 'effector-react';
import { setContractorStatusEvent } from 'features/contractor';
import { ContractRole, ContractType } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import contractorStyles from '../../styles.module.scss';
import { CABIN_STATUS } from '../../constants';
import styles from './styles.module.scss';

export const SignContract = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const setContractorStatus = useEvent(setContractorStatusEvent);

    useEffect(() => {
        setContractorStatus(CABIN_STATUS.sign_contract);
    }, [setContractorStatus]);

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.signingContract.title')}
            </div>
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
                            `${createOrder}?${orderFields.contractType}=${ContractType.mineowner_contractor}&${orderFields.isClient}=${ContractRole.executor}`
                        )
                    }
                >
                    {t('pages.contractor.signingContract.createButton')}
                </Button>
            </div>
        </div>
    );
};
