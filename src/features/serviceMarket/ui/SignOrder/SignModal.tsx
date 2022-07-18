import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'shared/ui';

type Props = {
    isVisible: boolean;
    title?: string;
    onCancel: () => void;
    onSubmit?: () => void;
    footer?: React.ReactNode[];
};

const SignModal: FC<Props> = ({
    isVisible,
    title,
    onCancel,
    onSubmit,
    footer,
    children,
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            visible={isVisible}
            title={title || t('pages.serviceMarket.order.selectMine')}
            onCancel={onCancel}
            footer={
                footer || [
                    <Button key="back" type="ghost" onClick={onCancel}>
                        {t('components.common.button.cancel')}
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSubmit}>
                        {t('components.common.button.sign')}
                    </Button>,
                ]
            }
        >
            {children}
        </Modal>
    );
};

export { SignModal };
