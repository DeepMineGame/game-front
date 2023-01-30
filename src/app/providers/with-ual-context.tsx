import React from 'react';
import { UALProvider } from 'ual-reactjs-renderer';
import { Anchor } from 'ual-anchor';
import { Wax } from '@eosdacio/ual-wax';
import { Wombat } from 'wombat-ual';
import { isMainNet, waxChain } from '../constants';

const wombatChain = {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    rpcEndpoints: [
        {
            protocol: 'https',
            host: 'api.eossweden.org',
            port: 443,
        },
    ],
};

const wombat = new Wombat([wombatChain], { appName: 'DeepMine' });
const chains = [waxChain];

const anchor = new Anchor(chains, { appName: 'DeepMine' });
const waxCloudWallet = new Wax(chains);

export const waxAuthenticators = isMainNet
    ? [anchor, waxCloudWallet, wombat]
    : [anchor];

export const withUalContext = (App: React.FC) => () =>
    (
        <UALProvider
            chains={[...chains, wombat]}
            appName="DeepMine"
            authenticators={waxAuthenticators}
        >
            <App />
        </UALProvider>
    );
