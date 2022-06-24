import React, { FC } from 'react';
import { Tabs, TabsProps } from 'antd';
import cn from 'classnames';
import styles from './styles.module.scss';

const { TabPane: TabsCardPane } = Tabs;

type Props = Omit<TabsProps, 'type'>;

const TabsCard: FC<Props> = ({ children, className, ...props }) => {
    return (
        <Tabs
            className={cn(styles.tabs, className)}
            type="card"
            size="small"
            {...props}
        >
            {children}
        </Tabs>
    );
};

export { TabsCard, TabsCardPane };
