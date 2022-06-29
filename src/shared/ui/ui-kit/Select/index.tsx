import { Select as SelectA, SelectProps } from 'antd';
import React, { FC } from 'react';
import styles from './styles.module.scss';

export const Select: FC<SelectProps> = (props) => {
    return (
        <SelectA
            dropdownClassName={styles.dropDownSelect}
            className={styles.select}
            {...props}
        />
    );
};
