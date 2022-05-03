import { PlusOutlined } from '@ant-design/icons';
import React, { FC, MouseEventHandler } from 'react';
import { Title } from '../typography/Title';
import styles from './styles.module.scss';

type Props = {
    text?: string;
    onClick: MouseEventHandler;
};

export const CardHolder: FC<Props> = ({ text = 'add\na cutter', onClick }) => {
    return (
        <div className={styles.cardHolder} onClick={onClick}>
            <PlusOutlined className={styles.icon} />
            <Title className={styles.title} level={5} fontFamily="orbitron">
                {text}
            </Title>
        </div>
    );
};
