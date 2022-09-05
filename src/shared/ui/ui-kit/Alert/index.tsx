import { FC } from 'react';
import cn from 'classnames';
import { Alert as AlertAnt, AlertProps } from 'antd';
import styles from './styles.module.scss';

export const Alert: FC<AlertProps> = ({ className, ...props }) => (
    <AlertAnt className={cn(styles.root, className)} {...props} />
);
