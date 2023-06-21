import compose from 'compose-function';
import { withRouter } from './with-router';
import { withUalContext } from './with-ual-context';
import { withAntdConfigProvider } from './with-antd-config-provider';

export const withProviders = compose(
    withRouter,
    withUalContext,
    withAntdConfigProvider
);
