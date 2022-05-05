import { Modal as ModalAnt, ModalProps } from 'antd';
import React, { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Button } from '../Button';
import { desktopS, useMediaQuery } from '../../../hooks';
import styles from './styles.module.scss';

type Props = {
    wideOnMobile?: boolean;
} & ModalProps;

export const Modal: FC<Props> = (props) => {
    const isDesktop = useMediaQuery(desktopS);
    const wideWidth = '100vw';
    const width = props.wideOnMobile && !isDesktop ? wideWidth : undefined;

    return (
        <ModalAnt
            className={classNames(styles.modal, {
                [styles.wideOnMobile]: props?.wideOnMobile,
            })}
            width={width}
            wrapClassName={styles.modalWrapper}
            centered={isDesktop}
            closeIcon={<CloseOutlined />}
            footer={
                props?.footer || (
                    <div>
                        <Button ghost>Cancel</Button>
                        <Button type="primary">Ok</Button>
                    </div>
                )
            }
            {...props}
        />
    );
};
