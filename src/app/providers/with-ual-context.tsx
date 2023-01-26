import React from 'react';
import { UALProvider } from 'ual-reactjs-renderer';
import { Anchor } from 'ual-anchor';
import { Wax } from '@eosdacio/ual-wax';
import { Wombat } from 'wombat-ual';
import { isMainNet, waxChain } from '../constants';

const chains = [waxChain];
const anchor = new Anchor(chains, { appName: 'DeepMine' });
const waxCloudWallet = new Wax(chains);

const wombat = new Wombat([waxChain], { appName: 'DeepMine' });

export const waxAuthenticators = isMainNet
    ? [anchor, waxCloudWallet, wombat]
    : [anchor];

export const withUalContext = (App: React.FC) => () =>
    (
        <UALProvider
            chains={chains}
            appName="DeepMine"
            authenticators={waxAuthenticators}
        >
            <App />
        </UALProvider>
    );
