import { Drawer as DrawerAnt, DrawerProps } from 'antd';
import { FC } from 'react';
import { Divider } from '../Divider';
import './styles.module.scss';

export const Drawer: FC<DrawerProps> = ({ children, ...props }) => (
    <DrawerAnt {...props}>
        {props.title && <Divider />}
        {children}
    </DrawerAnt>
);
