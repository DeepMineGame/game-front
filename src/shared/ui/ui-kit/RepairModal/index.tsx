import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { Button } from '../Button';
import { Title } from '../typography/Title';
import { CostBlock } from '../CostBlock';
import { Modal } from '../Modal';
import styles from './styles.module.scss';

type Props = {
    visible?: boolean;
    onCancel: () => void;
    onSubmit: () => void;
    actionText: string;
    costs: {
        timeSeconds: number;
        energy: number;
        coinAmount: number;
    };
};

export const RepairModal: FC<Props> = ({
    visible,
    onCancel,
    onSubmit,
    actionText,
    costs,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            className={styles.modal}
            visible={visible}
            title={
                <Title fontFamily="bai" level={5}>
                    {`${t('features.mining.equipment')} ${actionText}`}
                </Title>
            }
            onCancel={onCancel}
            footer={
                <Space align="end">
                    <Button type="ghost" onClick={onCancel}>
                        {t('components.common.button.cancel')}
                    </Button>
                    <Button
                        type="primary"
                        className={styles.primaryButton}
                        onClick={onSubmit}
                    >
                        {actionText}
                    </Button>
                </Space>
            }
        >
            <Title level={5} fontFamily="bai" thin>
                {t('components.common.actionModal.descriptionTime')}
            </Title>
            <CostBlock timeSeconds={costs.timeSeconds} />
            <CostBlock energy={costs.energy} />
            <CostBlock coinAmount={costs.coinAmount} />
        </Modal>
    );
};
