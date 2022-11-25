export const ENDPOINT =
    process.env.NODE_ENV === 'development'
        ? ''
        : process.env.REACT_APP_UBS_ORIGIN ?? 'https://rc.deepmine.world';

export const defaultConfig = {
    withCredentials: true,
};

export const CONNECTION_TIMEOUT = 8 * 1000;

export const isMainNet = process.env.REACT_APP_MAINNET === 'true';

export const WAX_CHAIN_ID = isMainNet
    ? '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4'
    : 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12';

export const WAX_RPC_ENDPOINTS_HOST = isMainNet
    ? 'wax.blokcrafters.io'
    : 'testnet-wax.3dkrender.com';

export const WAX_RPC_ENDPOINTS_PROTOCOL = 'https';

export const waxChain = {
    chainId: WAX_CHAIN_ID,
    rpcEndpoints: [
        {
            protocol: WAX_RPC_ENDPOINTS_PROTOCOL,
            host: WAX_RPC_ENDPOINTS_HOST,
            port: 443,
        },
    ],
};

const defaultEndpoints = {
    wax: isMainNet
        ? [
              'https://api.waxsweden.org',
              'https://api.wax.greeneosio.com',
              'https://wax.blokcrafters.io',
              'https://wax.greymass.com',
              'https://wax.dapplica.io',
              'https://wax.cryptolions.io',
              'https://wax.pink.gg',
          ]
        : [
              'https://testnet-wax.3dkrender.com',
              'https://waxtestnet.greymass.com',
              'https://wax-test.blokcrafters.io',
              'https://testnet.wax.blacklusion.io',
              'https://wax-testnet.eosphere.io',
              'https://api-testnet-wax.eosarabia.net',
              'https://testnet.wax.pink.gg',
          ],
    atomic: isMainNet
        ? [
              'https://wax.blokcrafters.io/atomicassets/v1',
              'https://aa.dapplica.io/atomicassets/v1',
              'https://wax.api.at1omicassets.io/atomicassets/v1',
              'https://wax.hkeos.com/aa/atomicassets/v1',
              'https://atomic2.hivebp.io/atomicassets/v1',
              'https://aa.wax.blacklusion.io/atomicassets/v1',
              'https://api.wax-aa.bountyblok.io/atomicassets/v1',
              'https://wax-aa.eosdublin.io/atomicassets/v1',
              'https://atomic.wax.eosrio.io/atomicassets/v1',
              'https://atomic.hivebp.io/atomicassets/v1',
              'https://wax-aa.eu.eosamsterdam.net/atomicassets/v1',
              'https://atomic.ledgerwise.io/atomicassets/v1',
              'https://api.atomic.greeneosio.com/atomicassets/v1',
              'https://atomic.sentnl.io/atomicassets/v1',
              'https://api-wax-aa.eosarabia.net/atomicassets/v1',
              'https://aa-api-wax.eosauthority.com/atomicassets/v1',
              'https://atomic.tokengamer.io/atomicassets/v1',
              'https://wax-atomic.eosiomadrid.io/atomicassets/v1',
              'https://api.wax.liquidstudios.io/atomicassets/v1',
              'https://atomic.3dkrender.com/atomicassets/v1',
          ]
        : ['https://test.wax.api.atomicassets.io/atomicassets/v1'],
};

export const endpoints = {
    atomic: (window.ENDPOINTS || defaultEndpoints).atomic,
    wax: (window.ENDPOINTS || defaultEndpoints).wax,
};

export const ConnectionCountLimit = {
    atomic: endpoints.atomic.length * 2,
    wax: endpoints.wax.length * 2,
};

export const getNextEndpoint = ({
    endpointsList,
    currentEndpoint,
}: {
    endpointsList: string[];
    currentEndpoint: string;
}) =>
    endpointsList[endpointsList.indexOf(currentEndpoint) + 1] ||
    endpointsList[0];

export const ATOMICHUB_URL = isMainNet
    ? 'https://wax.atomichub.io/'
    : 'https://wax-test.atomichub.io/explorer/collection/deepminetest';
