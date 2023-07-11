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
                                onClick={props.onCancel as any}
                                {...props.cancelButtonProps}
                            >
                                {props.cancelText || 'Cancel'}
                            </Button>
                        )}
                        {props.onOk && (
                            <Button
                                type="primary"
                                onClick={props.onOk as any}
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
