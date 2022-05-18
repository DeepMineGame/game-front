export const ENDPOINT =
    process.env.NODE_ENV === 'development'
        ? ''
        : process.env.REACT_APP_UBS_ORIGIN ?? 'https://rc.deepmine.world';

export const defaultConfig = {
    withCredentials: true,
};

export const isMainNet = process.env.REACT_APP_MAINNET === 'true';
export const WAX_CHAIN_ID = isMainNet
    ? '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4'
    : 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12';

export const WAX_RPC_ENDPOINTS_HOST = isMainNet
    ? 'wax.cryptolions.io'
    : 'testnet.waxsweden.org';

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

export const WAX_GET_TABLE_ENDPOINT = `https://${WAX_RPC_ENDPOINTS_HOST}/v1/chain/get_table_rows`;
