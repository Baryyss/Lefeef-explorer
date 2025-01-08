import { useKeplr } from './keplr';

export const useStaking = () => {
  const { initializeClient } = useKeplr();
  // eslint-disable-next-line consistent-return
  const test = async () => {
    const { cosmosClient, signerAddress, error } = await initializeClient();
    console.log(error, 'error');
    console.log(cosmosClient, 'cosmosClient');
    console.log(signerAddress, 'signerAddress');

    if (error) {
      return { error };
    }
  };
  return { test };
};
