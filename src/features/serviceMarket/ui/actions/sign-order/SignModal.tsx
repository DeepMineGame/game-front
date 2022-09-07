import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui';

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
            visible={isVisible}
            title={title || t('pages.serviceMarket.order.selectMine')}
            onCancel={onCancel}
            onOk={onOk}
            okText={okText || t('components.common.button.sign')}
        >
            {children}
        </Modal>
    );
};

export { SignModal };
