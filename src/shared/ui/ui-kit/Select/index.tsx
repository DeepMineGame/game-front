import { Select as SelectAnt, SelectProps } from 'antd';
import { FC, memo } from 'react';
import './styles.module.scss';

export const Select: FC<SelectProps> = memo((props) => (
    <SelectAnt {...props} />
));
