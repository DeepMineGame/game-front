import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { Button } from '../Button';
import { Title } from '../typography/Title';
import { Modal } from '../Modal';
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
            visible={visible}
            title={
                <Title fontFamily="bai" level={4}>
                    {texts.title}
                </Title>
            }
            onCancel={onCancel}
            footer={
                <Space align="end">
                    <Button type="ghost" onClick={onCancel}>
                        {t('components.common.button.cancel')}
                    </Button>
                    <Button type="primary" onClick={onSubmit}>
                        {texts.onOk || t('components.common.button.okay')}
                    </Button>
                </Space>
            }
        >
            <div className={styles.content}>
                {texts.subtitle && (
                    <Title
                        level={4}
                        fontFamily="bai"
                        thin
                        className={styles.title}
                    >
                        {texts.subtitle}
                    </Title>
                )}
                <KeyValueTable items={items!} />
            </div>
        </Modal>
    );
};
