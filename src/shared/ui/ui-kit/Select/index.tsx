import { Select as SelectA, SelectProps } from 'antd';
import { FC } from 'react';

export const Select: FC<SelectProps> = ({ bordered = true, ...props }) => {
    return <SelectA bordered={bordered} {...props} />;
};
