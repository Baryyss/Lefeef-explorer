import { ChainInfo } from '@keplr-wallet/types';

/* eslint-disable no-useless-concat */
export const chainInfo = (): ChainInfo => ({
  chainId: 'lefeef-testnet',
  chainName: 'lefeef',
  rpc: 'wss://drpc.lefeef.network:7443',
  rest: 'https://drest.lefeef.network:6443',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'lefeef',
    bech32PrefixAccPub: 'lefeef' + 'pub',
    bech32PrefixValAddr: 'lefeef' + 'valoper',
    bech32PrefixValPub: 'lefeef' + 'valoperpub',
    bech32PrefixConsAddr: 'lefeef' + 'valcons',
    bech32PrefixConsPub: 'lefeef' + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'LEFEEF',
      coinMinimalDenom: 'ulefeef',
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'LEFEEF',
      coinMinimalDenom: 'ulefeef',
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.5,
        average: 0.75,
        high: 1,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'LEFEEF',
    coinMinimalDenom: 'ulefeef',
    coinDecimals: 6,
  },
  features: ['cosmwasm'],
});
