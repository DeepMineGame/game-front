import { FC, memo, ReactNode, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTitle } from 'app/router/components/DocumentTitle';
import { Empty, Tabs, TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'shared';
import { useLocation } from 'react-router';
import { Page } from '../../ui-kit';

type Props = {
    tabs: {
        label: ReactNode;
        key: string;
        children?: ReactNode;
        disabled?: boolean;
    }[];
    documentTitleScope?: string;
    title?: string;
    className?: string;
    defaultDocTitle?: boolean;
    tabProps?: TabsProps;
};

export const PageWithTabs: FC<Props> = memo(
    ({
        tabs,
        documentTitleScope,
        title,
        className,
        defaultDocTitle,
        tabProps,
    }) => {
        const { t } = useTranslation();
        const query = useQuery();
        const tabId = query.get('tabId');
        const navigate = useNavigate();
        const location = useLocation();

        const navigateToTab = (id: string, replace = false) => {
            navigate(`${location.pathname}?tabId=${id}`, { replace });
        };

        const handleTabSelect = useCallback(navigateToTab, [
            location.pathname,
            navigate,
        ]);

        const selectedTabData = tabs.find((tab) => tab.key === String(tabId));

        useEffect(() => {
            navigateToTab(tabId || '0', true);
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
                            selectedTabData?.label || ''
                        } — DeepMine`}
                    />
                )}
                {tabs?.length ? (
                    <Tabs
                        centered
                        activeKey={tabId!}
                        onChange={handleTabSelect}
                        items={tabs}
                        {...tabProps}
                    />
                ) : (
                    <Empty />
                )}
            </Page>
        );
    }
);
