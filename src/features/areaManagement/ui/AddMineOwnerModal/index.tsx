import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from 'shared';
import styles from './styles.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
};

export const AddMineOwnerModal: FC<Props> = ({ visible, onCancel }) => {
    const { t } = useTranslation();

    return (
        <Modal
            className={styles.modal}
            width={458}
            visible={visible}
            onCancel={onCancel}
            title={t('pages.areaManagement.addMineOwner')}
            footer={null}
        >
            <Button className={styles.button} type="ghost">
                {t('pages.areaManagement.findMineOwner')}
            </Button>
            <Button className={styles.button} type="ghost">
                {t('pages.areaManagement.createOrder')}
            </Button>
        </Modal>
    );
};
