import { Modal as ModalAnt, ModalProps } from 'antd';
import React, { FC, ReactNode } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Button } from '../Button';
import { desktopS, useMediaQuery } from '../../../hooks';
import styles from './styles.module.scss';

type Props = {
    wideOnMobile?: boolean;
    className?: string;
    removeFooter?: boolean;
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
                [styles.removeFooter]: props?.removeFooter,
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
                        <Button onClick={props.onOk} type="primary">
                            {props.okText || 'Ok'}
                        </Button>
                    </div>
                )
            }
        />
    );
};

export function warning({
    title,
    content,
    ...props
}: {
    title: ReactNode;
    content: ReactNode;
} & ModalProps) {
    ModalAnt.warning({
        ...props,
        title: <span className={styles.simpleModalTitle}>{title}</span>,
        content,
        className: styles.simpleModal,
        okButtonProps: { className: styles.modalButton, type: 'primary' },
        okCancel: true,
        cancelButtonProps: { className: styles.ghostButton, ghost: true },
    });
}

export function success({
    title,
    content,
    ...props
}: {
    title: ReactNode;
    content: ReactNode;
} & ModalProps) {
    ModalAnt.success({
        ...props,
        title: <span className={styles.simpleModalTitle}>{title}</span>,
        content,
        className: styles.simpleModal,
        okButtonProps: { className: styles.modalButton, type: 'primary' },
        cancelButtonProps: { className: styles.ghostButton, ghost: true },
    });
}
