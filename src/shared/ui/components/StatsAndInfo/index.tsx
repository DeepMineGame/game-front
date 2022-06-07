import React, { FC, useState, JSXElementConstructor } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTitle } from 'app/router/components/DocumentTitle';
import { Navbar, Page } from '../../ui-kit';

type Props = {
    tabs: {
        id: number;
        component: JSXElementConstructor<any>;
        name: string;
    }[];
    documentTitleScope?: string;
};
export const StatsAndInfo: FC<Props> = ({ tabs, documentTitleScope }) => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState(tabs[0].id);

    const handleTabSelect = (id: number) => {
        setSelectedTab(id);
    };

    const selectedTabData = tabs.find((tab) => tab.id === selectedTab);
    const ContentComponent = selectedTabData?.component ?? (() => null);

    const navbarTabs = tabs.map((tab) => ({
        id: tab.id,
        name: tab.name,
    }));

    return (
        <Page headerTitle={t('components.statsAndInfo.title').toUpperCase()}>
            <DocumentTitle
                title={`${
                    documentTitleScope ? `${documentTitleScope} / ` : ''
                } Stats and Info / ${selectedTabData?.name || ''} — DeepMine`}
            />
            <Navbar
                selectedTabId={selectedTab}
                tabs={navbarTabs}
                onTabSelect={handleTabSelect}
            />
            <ContentComponent />
        </Page>
    );
};
