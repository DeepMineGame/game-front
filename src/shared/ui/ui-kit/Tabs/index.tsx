import React, { FC, ReactNode } from 'react';
import { Tabs as TabsA } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import styles from './styles.module.scss';

type Props = {
    config: { tabName: string; tabContent: ReactNode }[];
} & TabsProps;

export const Tabs: FC<Props> = ({ config, ...props }) => {
    return (
        <TabsA {...props} className={styles.tabs}>
            {config?.map(({ tabName, tabContent }) => (
                <TabsA.TabPane tab={tabName} key={tabName}>
                    {tabContent}
                </TabsA.TabPane>
            ))}
        </TabsA>
    );
};
