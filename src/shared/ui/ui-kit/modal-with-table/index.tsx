import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Typography } from 'antd';
import { KeyValueTable, KeyValueTableProps } from '../KeyValueTable';
import styles from './styles.module.scss';

export type ModalWithTableProps = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    texts: {
        onOk?: string;
        title: string;
        subtitle?: string;
    };
    items?: KeyValueTableProps['items'];
    className?: string;
};

export const ModalWithTable: FC<ModalWithTableProps> = ({
    visible,
    onCancel,
    onSubmit,
    texts,
    items,
    className,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            className={className}
            open={visible}
            title={texts.title}
            onCancel={onCancel}
            onOk={onSubmit}
            okText={texts.onOk || t('components.common.button.okay')}
            cancelText={t('Cancel')}
        >
            <div className={styles.content}>
                {texts.subtitle && (
                    <Typography.Text className={styles.title}>
                        {texts.subtitle}
                    </Typography.Text>
                )}
                <KeyValueTable items={items!} />
            </div>
        </Modal>
    );
};
