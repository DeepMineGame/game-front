import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';

type Props = {
    isVisible: boolean;
    title?: string;
    onCancel: () => void;
    onOk?: () => void;
    okText?: string;
};

const SignModal: FC<Props> = ({
    isVisible,
    title,
    onCancel,
    onOk,
    children,
    okText,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            open={isVisible}
            title={title || t('Select the mine')}
            onCancel={onCancel}
            onOk={onOk}
            okText={okText || t('components.common.button.sign')}
        >
            {children}
        </Modal>
    );
};

export { SignModal };
