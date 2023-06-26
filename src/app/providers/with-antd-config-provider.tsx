import { ConfigProvider, theme, App } from 'antd';

export const withAntdConfigProvider = (AppProvided: React.FC) => () =>
    (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                inherit: true,
                token: {
                    borderRadius: 6,
                    colorBgBase: '#141414',
                    colorError: '#D32029',
                    colorInfo: '#2E9EFF',
                    colorPrimary: '#F5C913',
                    colorSuccess: '#47FF40',
                    colorTextBase: '#FFFFFF',
                    colorWarning: '#D87A16',
                    controlHeight: 32,
                    fontFamily: 'Bai Jamjuree, Orbitron',
                    fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
monospace`,
                    fontSize: 14,
                    lineType: 'solid',
                    lineWidth: 1,
                    motionBase: 0,
                    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
                    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
                    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
                    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
                    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
                    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
                    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
                    motionUnit: 0.1,
                    opacityImage: 1,
                    sizePopupArrow: 16,
                    sizeStep: 4,
                    sizeUnit: 4,
                    wireframe: false,
                    zIndexBase: 0,
                    zIndexPopupBase: 1000,
                    colorPrimaryBg: '#3D3100',
                    colorPrimaryBgHover: '#524200',
                    colorPrimaryBorder: '#7B6300',
                    colorPrimaryBorderHover: '#A38400',
                    colorPrimaryHover: '#CCA500',
                    colorPrimaryActive: '#FFD93E',
                    colorPrimaryTextHover: '#FFE168',
                    colorPrimaryTextActive: '#FFF2BD',
                    colorInfoHover: '#FFD93E',
                    colorLink: '#CCA500',
                },
            }}
        >
            <App>
                <AppProvided />
            </App>
        </ConfigProvider>
    );
