import { Select as SelectA, SelectProps } from 'antd';
import React, { FC } from 'react';
import styles from './styles.module.scss';

export const Select: FC<SelectProps> = (props) => {
    return (
        <div className={styles.select}>
            <SelectA dropdownClassName={styles.dropDownSelect} {...props} />
        </div>
    );
};
