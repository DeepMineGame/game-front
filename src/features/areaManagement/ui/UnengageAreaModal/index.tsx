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
};

export const UnengageAreaModal: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
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
                    <Title level={5}>
                        {t('pages.areaManagement.unengage')}
                    </Title>
                    <div className={styles.description}>
                        {t('pages.areaManagement.unengageDescription')}
                    </div>
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
                    {t('pages.areaManagement.unengage')}
                </Button>
            </div>
        </Modal>
    );
};
