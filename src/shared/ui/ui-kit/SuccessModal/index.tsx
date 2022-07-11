import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Result } from 'antd';

import { Button } from 'shared';
import styles from './styles.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    title: string;
    description: string;
};

export const SuccessModal: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
    title,
    description,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            width={520}
            centered
            className={styles.modal}
            visible={visible}
            onCancel={onCancel}
            title={title}
            footer={
                <Button type="primary" onClick={onSubmit}>
                    {t('components.common.button.okay')}
                </Button>
            }
        >
            <Result
                status="success"
                className={styles.success}
                title={<div className={styles.description}>{description}</div>}
            />
        </Modal>
    );
};
