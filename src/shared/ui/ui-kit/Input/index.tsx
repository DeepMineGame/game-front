import { Input as InputA, InputProps } from 'antd';
import React, { FC } from 'react';
import styles from './styles.module.scss';

export const Input: FC<InputProps> = (props) => (
    <InputA className={styles.input} {...props} />
);
