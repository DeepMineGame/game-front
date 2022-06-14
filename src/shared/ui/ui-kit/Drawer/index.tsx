import { Drawer as DrawerA, DrawerProps } from 'antd';
import React, { FC } from 'react';
import { neutral3Color } from '../../variables';

const drawerBodyStyle = { background: neutral3Color };
const contentWrapperStyle = { background: neutral3Color };

export const Drawer: FC<DrawerProps> = (props) => {
    return (
        <DrawerA
            contentWrapperStyle={contentWrapperStyle}
            bodyStyle={drawerBodyStyle}
            {...props}
        />
    );
};
