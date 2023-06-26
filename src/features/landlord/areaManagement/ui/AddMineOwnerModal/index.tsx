import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from 'shared';
import { useNavigate } from 'react-router-dom';
import { createOrder, serviceMarket } from 'app/router/paths';
import { ContractRole, ContractType } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { Roles } from 'entities/game-stat';
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
            open={visible}
            onCancel={onCancel}
            title={t('pages.areaManagement.add')}
        >
            <Button
                className={styles.button}
                block
                onClick={() =>
                    navigate(`${serviceMarket}?user_role=${Roles.landlord}`)
                }
            >
                {t('pages.areaManagement.findMineOwner')}
            </Button>
            <Button
                className={styles.button}
                block
                onClick={() =>
                    navigate(
                        `${createOrder}?${orderFields.contractType}=${ContractType.landlord_mineowner}&${orderFields.isClient}=${ContractRole.client}`
                    )
                }
            >
                {t('pages.areaManagement.createOrder')}
            </Button>
        </Modal>
    );
};
