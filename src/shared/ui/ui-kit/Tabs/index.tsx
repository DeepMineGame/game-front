import { FC, memo, ReactNode } from 'react';
import { Tabs as TabsAnt, TabsProps } from 'antd';

export type Tab = {
    label: ReactNode;
    key: string;
    children?: ReactNode;
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
