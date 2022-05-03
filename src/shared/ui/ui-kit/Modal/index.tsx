import { Modal as ModalAnt, ModalProps } from 'antd';
import React, { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from '../Button';
import { desktopS, useMediaQuery } from '../../../hooks';
import styles from './styles.module.scss';

type Props = ModalProps;

export const Modal: FC<Props> = (props) => {
    const isDesktop = useMediaQuery(desktopS);
    const wideWidth = '100vw';
    const width = isDesktop ? undefined : wideWidth;

    return (
        <ModalAnt
            className={styles.modal}
            width={width}
            wrapClassName={styles.modalWrapper}
            centered={isDesktop}
            closeIcon={<CloseOutlined />}
            footer={
                <div>
                    <Button ghost>Cancel</Button>
                    <Button type="primary">Ok</Button>
                </div>
            }
            {...props}
        />
    );
};
