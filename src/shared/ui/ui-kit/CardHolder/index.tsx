import { PlusOutlined } from '@ant-design/icons';
import { FC, MouseEventHandler } from 'react';
import { Title } from '../Typography/Title';
import styles from './styles.module.scss';

type Props = {
    name?: string;
    onClick: MouseEventHandler;
};

export const CardHolder: FC<Props> = ({ name, onClick }) => {
    return (
        <div className={styles.cardHolder} onClick={onClick}>
            <PlusOutlined className={styles.icon} />
            <Title level={5}>
                ADD
                <br />
                {name}
            </Title>
        </div>
    );
};
