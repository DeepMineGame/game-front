import { FC, Key, memo, ReactNode } from 'react';
import { Tabs as TabsAnt, TabsProps } from 'antd';

export type Tab = {
    tab: ReactNode;
    key: Key;
    children: ReactNode;
    disabled?: boolean;
};

type Props = {
    items: Tab[];
} & TabsProps;

export const Tabs: FC<Props> = memo(({ items, ...props }) => (
    <TabsAnt {...props}>
        {items.map(({ children, ...tabProps }) => (
            <TabsAnt.TabPane {...tabProps}>{children}</TabsAnt.TabPane>
        ))}
    </TabsAnt>
));
