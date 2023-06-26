import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Result } from 'antd';

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
            open={visible}
            onCancel={onCancel}
            title={title}
            onOk={onSubmit}
            okText={t('components.common.button.okay')}
        >
            <Result
                status="success"
                className={styles.success}
                title={<div className={styles.description}>{description}</div>}
            />
        </Modal>
    );
};
