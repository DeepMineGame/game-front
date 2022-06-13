import { Drawer as DrawerA, DrawerProps } from 'antd';
import React, { FC } from 'react';
import { neutral3Color } from '../../variables';

export const Drawer: FC<DrawerProps> = (props) => {
    return (
        <DrawerA
            contentWrapperStyle={{ background: neutral3Color }}
            bodyStyle={{ background: neutral3Color }}
            {...props}
        />
    );
};
