import { FC, ReactNode } from 'react';
import { Modal as ModalAnt, ModalFuncProps, ModalProps } from 'antd';
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
                            <Button
                                ghost
                                onClick={props.onCancel}
                                {...props.cancelButtonProps}
                            >
                                {props.cancelText || 'Cancel'}
                            </Button>
                        )}
                        {props.onOk && (
                            <Button
                                type="primary"
                                onClick={props.onOk}
                                {...props.okButtonProps}
                            >
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
        okCancel: true,
    });
};

export const confirm = ({ title, ...props }: ModalFuncProps) => {
    ModalAnt.confirm({
        ...props,
        title: <b className={styles.simpleModalTitle}>{title}</b>,
        className: styles.simpleModal,
        okCancel: true,
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
    });
};
