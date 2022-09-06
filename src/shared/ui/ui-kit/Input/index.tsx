import { FC, memo } from 'react';
import { Input as InputAnt, InputProps } from 'antd';
import './styles.module.scss';

export const Input: FC<InputProps> = memo((props) => <InputAnt {...props} />);
