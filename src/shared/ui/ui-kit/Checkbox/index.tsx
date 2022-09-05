import { Checkbox as CheckboxAnt, CheckboxProps } from 'antd';
import cn from 'classnames';
import { FC } from 'react';
import styles from './styles.module.scss';

export const Checkbox: FC<CheckboxProps> = (props) => (
    <CheckboxAnt className={cn(styles.root, props.className)} {...props} />
);
