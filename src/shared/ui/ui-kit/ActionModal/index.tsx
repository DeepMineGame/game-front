import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { Button } from '../Button';
import { Title } from '../typography/Title';
import { CostBlock } from '../CostBlock';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

type Props = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    texts: {
        submit: string;
        title?: string;
    };
    costs?: {
        timeSeconds?: number;
        energy?: number;
        coinAmount?: number;
    };
};

// TODO: remove EquipmentInstallationModal and TravelModal
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
            title={
                <Title fontFamily="bai" level={5}>
                    {texts?.title}
                </Title>
            }
            onCancel={onCancel}
            footer={
                <Space align="end">
                    <Button type="ghost" onClick={onCancel}>
                        {t('components.common.button.cancel')}
                    </Button>
                    <Button type="primary" onClick={onSubmit}>
                        {texts?.submit}
                    </Button>
                </Space>
            }
        >
            <Title level={5} fontFamily="bai" thin>
                {t('components.common.actionModal.descriptionTime')}
            </Title>
            {costs?.timeSeconds && (
                <CostBlock timeSeconds={costs?.timeSeconds} />
            )}
            {costs?.energy && <CostBlock energy={costs?.energy} />}
            {costs?.coinAmount && <CostBlock coinAmount={costs?.coinAmount} />}
        </Modal>
    );
};
