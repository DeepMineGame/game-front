import React, { FC, ReactNode } from 'react';
import { Tabs as TabsA } from 'antd';
import { TabsProps } from 'antd/lib/tabs';

type Props = {
    config: { tabName: string; tabContent: ReactNode; disabled?: boolean }[];
} & TabsProps;

export const Tabs: FC<Props> = ({ config, ...props }) => {
    return (
        <TabsA {...props}>
            {config.map(({ tabName, tabContent, disabled }) => (
                <TabsA.TabPane tab={tabName} key={tabName} disabled={disabled}>
                    {tabContent}
                </TabsA.TabPane>
            ))}
        </TabsA>
    );
};
