import React, { FC } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type TabType = {
    id: number;
    name: string;
};

type Props = {
    selectedTabId: number;
    tabs: TabType[];
    onTabSelect: (id: number) => void;
};

export const Navbar: FC<Props> = ({ tabs, selectedTabId, onTabSelect }) => {
    const handleTabClick = (id: number) => () => {
        onTabSelect(id);
    };

    return (
        <div className={styles.navbar}>
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={cn(styles.navbarItem, {
                        [styles.navbarItemSelected]: tab.id === selectedTabId,
                    })}
                    onClick={handleTabClick(tab.id)}
                >
                    {tab.name}
                </div>
            ))}
        </div>
    );
};
