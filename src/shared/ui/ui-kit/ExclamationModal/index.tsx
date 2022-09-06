import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Modal } from 'shared';
import styles from './styles.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    title: string;
    description: string;
    submitText: string;
};

export const ExclamationModal: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
    title,
    description,
    submitText,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            width={400}
            closable={false}
            centered
            className={styles.modal}
            visible={visible}
            onCancel={onCancel}
            onOk={onSubmit}
            okText={submitText}
            cancelText={t('components.common.button.cancel')}
            title={title}
        >
            <div className={styles.content}>
                <ExclamationCircleOutlined />
                <div className={styles.description}>{description}</div>
            </div>
        </Modal>
    );
};
