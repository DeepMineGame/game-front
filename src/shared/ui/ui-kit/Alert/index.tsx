import React, { FC } from 'react';
import cn from 'classnames';
import { Alert as AlertA, AlertProps } from 'antd';
import styles from './styles.module.scss';

const Alert: FC<AlertProps> = ({ className, ...props }) => {
    return <AlertA className={cn(styles.alert, className)} {...props} />;
};

export { Alert };
