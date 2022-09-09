import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { Button } from '../Button';
import { Title } from '../Typography/Title';
import { Modal } from '../Modal';
import { CostsTable } from '../CostsTable';
import styles from './styles.module.scss';

type Props = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    texts: {
        onOk: string;
        title?: string;
    };
    costs?: {
        timeSeconds?: number;
        energy?: number;
        coinAmount?: number;
    };
};

// TODO: remove EquipmentInstallationModal
export const ActionModal: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
    texts,
    costs,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            className={styles.modal}
            visible={visible}
            title={<Title level={5}>{texts?.title}</Title>}
            onCancel={onCancel}
            footer={
                <Space align="end">
                    <Button type="ghost" onClick={onCancel}>
                        {t('components.common.button.cancel')}
                    </Button>
                    <Button type="primary" onClick={onSubmit}>
                        {texts?.onOk}
                    </Button>
                </Space>
            }
        >
            <Title level={5}>
                {t('components.common.actionModal.descriptionTime')}
            </Title>
            <CostsTable {...costs} />
        </Modal>
    );
};
