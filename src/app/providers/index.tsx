import compose from 'compose-function';
import { withRouter } from './with-router';
import { withUalContext } from './with-ual-context';

export const withProviders = compose(withRouter, withUalContext);
