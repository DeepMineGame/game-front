import { PlusOutlined } from '@ant-design/icons';
import React, { FC, MouseEventHandler } from 'react';
import { Title } from '../typography/Title';
import styles from './styles.module.scss';

type Props = {
    name?: string;
    onClick: MouseEventHandler;
};

export const CardHolder: FC<Props> = ({ name, onClick }) => {
    return (
        <div className={styles.cardHolder} onClick={onClick}>
            <PlusOutlined className={styles.icon} />
            <Title className={styles.title} level={5} fontFamily="orbitron">
                ADD
                <br />
                {name}
            </Title>
        </div>
    );
};
