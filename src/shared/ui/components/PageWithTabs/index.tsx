import React, { FC, useState, JSXElementConstructor } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTitle } from 'app/router/components/DocumentTitle';
import { Empty } from 'antd';
import { Navbar, Page } from '../../ui-kit';

export type Tab = {
    id: number;
    component: JSXElementConstructor<any>;
    name: string;
};
type Props = {
    tabs: Tab[];
    documentTitleScope?: string;
    title?: string;
    className?: string;
};
export const PageWithTabs: FC<Props> = ({
    tabs,
    documentTitleScope,
    title,
    className,
}) => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState(tabs?.[0]?.id);

    const handleTabSelect = (id: number) => {
        setSelectedTab(id);
    };

    const selectedTabData = tabs.find((tab) => tab.id === selectedTab);
    const ContentComponent = (selectedTabData?.component ?? (() => null)) as FC;

    const navbarTabs = tabs.map((tab) => ({
        id: tab.id,
        name: tab.name,
    }));

    return (
        <Page
            headerTitle={
                title || t('components.common.statsAndInfo.title').toUpperCase()
            }
            className={className}
        >
            <DocumentTitle
                title={`${
                    documentTitleScope ? `${documentTitleScope} / ` : ''
                } Stats and Info / ${selectedTabData?.name || ''} — DeepMine`}
            />
            {tabs?.length ? (
                <>
                    <Navbar
                        selectedTabId={selectedTab}
                        tabs={navbarTabs}
                        onTabSelect={handleTabSelect}
                    />
                    <ContentComponent />
                </>
            ) : (
                <Empty />
            )}
        </Page>
    );
};
