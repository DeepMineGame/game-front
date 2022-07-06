import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

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
            <div className={styles.content}>
                <CheckCircleFilled className={styles.icon} />
                <div className={styles.description}>{description}</div>
            </div>
        </Modal>
    );
};
