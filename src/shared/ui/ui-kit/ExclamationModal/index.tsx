import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Button, Title } from 'shared';
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
            footer={null}
        >
            <div className={styles.content}>
                <ExclamationCircleOutlined />
                <div>
                    <Title level={5}>{title}</Title>
                    <div className={styles.description}>{description}</div>
                </div>
            </div>

            <div className={styles.buttons}>
                <Button
                    className={styles.button}
                    type="ghost"
                    onClick={onCancel}
                >
                    {t('components.common.button.cancel')}
                </Button>
                <Button
                    className={styles.button}
                    type="primary"
                    onClick={onSubmit}
                >
                    {submitText}
                </Button>
            </div>
        </Modal>
    );
};
