import { Select as SelectA, SelectProps } from 'antd';
import { FC } from 'react';
import styles from './styles.module.scss';

export const Select: FC<SelectProps> = (props) => {
    return (
        <div
            className={props.bordered ? styles.select : styles.selectBorderless}
        >
            <SelectA dropdownClassName={styles.dropDownSelect} {...props} />
        </div>
    );
};
