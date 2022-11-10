import { FC } from 'react';
import { Alert, AlertProps } from 'antd';
import cn from 'classnames';
import styles from './styles.module.scss';

export const ContractAlert: FC<AlertProps> = (props) => (
    <Alert {...props} className={cn(styles.alert)} type="info" showIcon />
);
