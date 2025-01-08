import { SigningStargateClient } from '@cosmjs/stargate';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { chainInfo } from './chainInfo';

declare global {
  interface Window extends KeplrWindow {}
}

export const useKeplr = () => {
  async function initializeClient(): Promise<{
    cosmosClient?: SigningStargateClient;
    signerAddress?: string;
    error?: string;
  }> {
    const { keplr } = window as any;

    if (!keplr) {
      return { error: 'You need to install Keplr' };
    }

    try {
      const chain = chainInfo();

      // Suggest the chain to Keplr
      await keplr.experimentalSuggestChain(chain);

      // Enable the chain in Keplr
      await keplr.enable(chain.chainId);

      // Get the offline signer
      const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(chain.chainId);
      if (!offlineSigner) {
        return { error: 'Error while getting offlineSigner' };
      }

      // Get the signer address
      const accounts = await offlineSigner.getAccounts();
      if (accounts.length === 0) {
        return { error: 'No accounts found in Keplr' };
      }
      const signerAddress = accounts[0].address;

      // Initialize the Cosmos client
      const cosmosClient = await SigningStargateClient.connectWithSigner(chain.rpc, offlineSigner);

      return {
        cosmosClient,
        signerAddress,
      };
    } catch (error: any) {
      return {
        error: error?.message || 'An error occurred during client initialization',
      };
    }
  }

  async function connectWithKeplr(): Promise<{ result?: any; error?: string }> {
    try {
      const { cosmosClient, signerAddress, error } = await initializeClient();

      if (error || !cosmosClient) {
        return { error: error ?? 'Client initialization failed' };
      }

      const balances = await cosmosClient.getAllBalances(signerAddress ?? '');

      if (!balances) {
        return { error: 'Error while fetching balances' };
      }

      const result = {
        address: signerAddress,

        balances,
      };
      return { result };
    } catch (error: any) {
      return { error: error.message || 'An unexpected error occurred' };
    }
  }

  async function checkKeplrConnection(): Promise<boolean> {
    try {
      const { keplr } = window;

      if (!keplr) {
        return false;
      }

      const offlineSigner = keplr.getOfflineSigner!(chainInfo().chainId);
      const accounts = await offlineSigner.getAccounts();

      return accounts.length > 0;
    } catch {
      return false;
    }
  }

  return {
    initializeClient,
    connectWithKeplr,
    checkKeplrConnection,
  };
};
