import { FC, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTitle } from 'app/router/components/DocumentTitle';
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'shared';
import { useLocation } from 'react-router';
import { Page, Tab, Tabs } from '../../ui-kit';

type Props = {
    tabs: Tab[];
    documentTitleScope?: string;
    title?: string;
    className?: string;
    defaultDocTitle?: boolean;
};

export const PageWithTabs: FC<Props> = memo(
    ({ tabs, documentTitleScope, title, className, defaultDocTitle }) => {
        const { t } = useTranslation();
        const query = useQuery();
        const tabId = query.get('tabId');
        const navigate = useNavigate();
        const location = useLocation();

        const navigateToTab = (id: string) => {
            navigate(`${location.pathname}?tabId=${id}`);
        };

        const handleTabSelect = useCallback(navigateToTab, [
            location.pathname,
            navigate,
        ]);

        const selectedTabData = tabs.find((tab) => tab.key === Number(tabId));

        useEffect(() => {
            navigateToTab(tabId || '0');
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Page
                headerTitle={
                    title ||
                    t('components.common.statsAndInfo.title').toUpperCase()
                }
                className={className}
            >
                {!defaultDocTitle && (
                    <DocumentTitle
                        title={`${
                            documentTitleScope ? `${documentTitleScope} / ` : ''
                        } Stats and Info / ${
                            selectedTabData?.tab || ''
                        } — DeepMine`}
                    />
                )}
                {tabs?.length ? (
                    <Tabs
                        activeKey={tabId!}
                        onChange={handleTabSelect}
                        items={tabs}
                    />
                ) : (
                    <Empty />
                )}
            </Page>
        );
    }
);
