import { FC, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTitle } from 'app/router/components/DocumentTitle';
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'shared';
import { useLocation } from 'react-router';
import { Navbar, Page } from '../../ui-kit';

export type Tab = {
    id: number;
    component: ReactNode;
    name: string;
};
type Props = {
    tabs: Tab[];
    documentTitleScope?: string;
    title?: string;
    className?: string;
    defaultDocTitle?: boolean;
};

export const PageWithTabs: FC<Props> = ({
    tabs,
    documentTitleScope,
    title,
    className,
    defaultDocTitle,
}) => {
    const { t } = useTranslation();
    const query = useQuery();
    const tabId = Number(query.get('tabId'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabSelect = useCallback(
        (id: number) => {
            navigate(`${location.pathname}?tabId=${id}`);
        },
        [location.pathname, navigate]
    );

    const selectedTabData = tabs.find((tab) => tab.id === tabId);
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
            {!defaultDocTitle && (
                <DocumentTitle
                    title={`${
                        documentTitleScope ? `${documentTitleScope} / ` : ''
                    } Stats and Info / ${
                        selectedTabData?.name || ''
                    } — DeepMine`}
                />
            )}
            {tabs?.length ? (
                <>
                    <Navbar
                        selectedTabId={tabId}
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
