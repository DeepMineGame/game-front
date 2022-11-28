import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { Button } from '../Button';
import { Title } from '../typography/Title';
import { Modal } from '../Modal';
import { KeyValueTable } from '../KeyValueTable';
import styles from './styles.module.scss';

type Props = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    texts: {
        onOk?: string;
        title: string;
        subtitle?: string;
    };
    items: Record<string, ReactNode>;
};

// TODO: remove EquipmentInstallationModal
export const ModalWithTable: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
    texts,
    items,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            className={styles.modal}
            visible={visible}
            title={
                <Title fontFamily="bai" level={5}>
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
            {texts.subtitle && (
                <Title level={5} fontFamily="bai" thin>
                    {texts.subtitle}
                </Title>
            )}
            <KeyValueTable items={items} />
        </Modal>
    );
};
