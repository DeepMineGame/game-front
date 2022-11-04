import { FC, ReactElement } from 'react';
import { Alert } from 'antd';
import cn from 'classnames';
import styles from './styles.module.scss';

const ContractAlert: FC<{ message: ReactElement }> = ({ message }) => (
    <Alert
        className={cn(styles.alert)}
        message={message}
        type="info"
        showIcon
    />
);

export { ContractAlert };
