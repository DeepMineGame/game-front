import React from 'react';
import { UALProvider } from 'ual-reactjs-renderer';
import { Anchor } from 'ual-anchor';
import { Wax } from '@eosdacio/ual-wax';
import { isMainNet, waxChain } from '../constants';

const anchor = new Anchor([waxChain], { appName: 'DeepMine' });
const waxCloudWallet = new Wax([waxChain]);

export const waxAuthenticators = isMainNet
    ? [anchor, waxCloudWallet]
    : [anchor];

export const withUalContext = (app: () => React.ReactNode) => () =>
    (
        <UALProvider
            chains={[waxChain]}
            appName="DeepMine"
            authenticators={waxAuthenticators}
        >
            {app()}
        </UALProvider>
    );
