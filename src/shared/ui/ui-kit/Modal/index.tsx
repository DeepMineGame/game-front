import { Modal as ModalAnt, ModalProps } from 'antd';
import { FC, ReactNode } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Button } from '../Button';
import { desktopS, useMediaQuery } from '../../../lib/hooks';
import styles from './styles.module.scss';

type Props = {
    wideOnMobile?: boolean;
    className?: string;
} & ModalProps;

export const Modal: FC<Props> = (props) => {
    const isDesktop = useMediaQuery(desktopS);
    const wideWidth = '100vw';
    const width = props.wideOnMobile && !isDesktop ? wideWidth : undefined;

    return (
        <ModalAnt
            {...props}
            className={classNames(styles.modal, props?.className, {
                [styles.wideOnMobile]: props?.wideOnMobile,
            })}
            width={width}
            wrapClassName={styles.modalWrapper}
            centered={isDesktop}
            closeIcon={<CloseOutlined />}
            footer={
                props?.footer || (
                    <div>
                        {props.onCancel && (
                            <Button onClick={props.onCancel} ghost>
                                {props.cancelText || 'Cancel'}
                            </Button>
                        )}
                        {props.onOk && (
                            <Button onClick={props.onOk} type="primary">
                                {props.okText || 'Ok'}
                            </Button>
                        )}
                    </div>
                )
            }
        />
    );
};

export const showWarningModal = ({
    title,
    content,
    ...props
}: {
    title: ReactNode;
    content: ReactNode;
} & ModalProps) => {
    ModalAnt.warning({
        ...props,
        title: <span className={styles.simpleModalTitle}>{title}</span>,
        content,
        className: styles.simpleModal,
        okButtonProps: { className: styles.modalButton, type: 'primary' },
        okCancel: true,
        cancelButtonProps: { className: styles.ghostButton, ghost: true },
    });
};

export const showSuccessModal = ({
    title,
    content,
    ...props
}: {
    title: ReactNode;
    content: ReactNode;
} & ModalProps) => {
    ModalAnt.success({
        ...props,
        title: <span className={styles.simpleModalTitle}>{title}</span>,
        content,
        className: styles.simpleModal,
        okButtonProps: { className: styles.modalButton, type: 'primary' },
        cancelButtonProps: { className: styles.ghostButton, ghost: true },
    });
};

export const showErrorModal = ({
    title,
    content,
    ...props
}: {
    title: ReactNode;
    content: ReactNode;
} & ModalProps) => {
    ModalAnt.error({
        ...props,
        title: <span className={styles.simpleModalTitle}>{title}</span>,
        content,
        className: styles.simpleModal,
        okButtonProps: { className: styles.modalButton, type: 'primary' },
        cancelButtonProps: { className: styles.ghostButton, ghost: true },
    });
};
