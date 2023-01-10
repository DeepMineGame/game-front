import React from 'react';
import { ConfigProvider, theme, App } from 'antd';
import {
    blue1,
    gold4,
    gold5,
    gold6,
    green6,
    neutral1,
    neutral10,
    neutral2,
    neutral3Color,
    neutral5,
    neutral6,
    neutral9,
    primary,
    primary1,
    primary3,
    primary5,
    primary7,
} from 'shared';

export const withAntdConfigProvider = (AppProvided: React.FC) => () =>
    (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: primary,
                    colorInfo: primary,
                    'green-6': green6,
                    colorPrimaryHover: primary5,
                    colorPrimaryActive: primary7,
                    colorBorder: neutral5,
                    colorText: neutral9,
                    colorTextSecondary: neutral10,
                    colorWarningHover: gold6,
                    colorWarningActive: gold5,
                    colorWarningOutline: gold4,
                    colorTextHeading: neutral10,
                    fontFamily: '"Bai Jamjuree", sans-serif',
                    colorTextLightSolid: neutral1,
                    colorBgBase: 'yellow',
                },
                components: {
                    Select: {
                        controlItemBgHover: blue1,
                    },
                    Alert: {
                        colorInfoBorder: primary3,
                        colorInfoBg: primary1,
                    },
                },
            }}
        >
            <App>
                <AppProvided />
            </App>
        </ConfigProvider>
    );
