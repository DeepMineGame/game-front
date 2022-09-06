import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from 'shared';
import { useNavigate } from 'react-router-dom';
import { createOrder, serviceMarket } from 'app/router/paths';
import { ServiceMarketTabIds } from 'app/router/constants';
import {
    ContractRole,
    ContractType,
    createContrFormFields,
} from 'entities/smartcontract';
import styles from './styles.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
};

export const AddMineOwnerModal: FC<Props> = ({ visible, onCancel }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Modal
            className={styles.modal}
            width={458}
            visible={visible}
            onCancel={onCancel}
            title={t('pages.areaManagement.addMineOwner')}
        >
            <Button
                className={styles.button}
                block
                type="ghost"
                onClick={() =>
                    navigate(
                        `${serviceMarket}?tabId=${ServiceMarketTabIds.mineOperation}`
                    )
                }
            >
                {t('pages.areaManagement.findMineOwner')}
            </Button>
            <Button
                className={styles.button}
                block
                type="ghost"
                onClick={() =>
                    navigate(
                        `${createOrder}?${createContrFormFields.contractType}=${ContractType.landlord_mineowner}&${createContrFormFields.isClient}=${ContractRole.client}`
                    )
                }
            >
                {t('pages.areaManagement.createOrder')}
            </Button>
        </Modal>
    );
};
