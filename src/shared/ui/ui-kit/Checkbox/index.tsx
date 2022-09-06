import { Checkbox as CheckboxAnt, CheckboxProps } from 'antd';
import cn from 'classnames';
import { FC, memo } from 'react';
import styles from './styles.module.scss';

export const Checkbox: FC<CheckboxProps> = memo((props) => (
    <CheckboxAnt className={cn(styles.root, props.className)} {...props} />
));
