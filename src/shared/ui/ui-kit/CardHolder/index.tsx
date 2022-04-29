import { PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { Title } from '../typography/Title';
import styles from './styles.module.scss';

type Props = {
    text?: string;
};

export const CardHolder: FC<Props> = ({ text = 'add\na cutter' }) => {
    return (
        <div className={styles.cardHolder}>
            <PlusOutlined className={styles.icon} />
            <Title className={styles.title} level={5} fontFamily="orbitron">
                {text}
            </Title>
        </div>
    );
};
