import { Checkbox as CheckboxA, CheckboxProps } from 'antd';
import cn from 'classnames';
import styles from './styles.module.scss';

export const Checkbox = (props: CheckboxProps) => {
    return (
        <CheckboxA
            {...props}
            className={cn(styles.checkbox, props.className)}
        />
    );
};
