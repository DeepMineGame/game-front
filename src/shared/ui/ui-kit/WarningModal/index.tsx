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
    submitText?: string;
    footer?: React.ReactNode[];
};

export const WarningModal: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
    title,
    description,
    footer,
    submitText,
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
                footer || [
                    <Button onClick={onCancel} ghost>
                        {t('components.common.button.cancel')}
                    </Button>,
                    <Button onClick={onSubmit} type="primary">
                        {submitText || 'Ok'}
                    </Button>,
                ]
            }
        >
            <Result
                className={styles.warning}
                subTitle={
                    <div className={styles.description}>{description}</div>
                }
            />
        </Modal>
    );
};
