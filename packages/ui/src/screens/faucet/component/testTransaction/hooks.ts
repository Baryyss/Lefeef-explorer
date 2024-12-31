import { DirectSecp256k1HdWallet, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { useState } from 'react';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import { SigningStargateClient } from '@cosmjs/stargate';

export const useTestTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txResult, setTxResult] = useState<any>();

  const getFaucetOneSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic(
      process.env.NEXT_PUBLIC_MENEMONIC_FAUCET_ONE ?? '',
      {
        prefix: 'lefeef',
      }
    );
  };

  const processTransaction = async (receiver: string) => {
    try {
      setLoading(true);
      const faucetOneSigner: OfflineDirectSigner = await getFaucetOneSignerFromMnemonic();

      const signingClient = await SigningStargateClient.connectWithSigner(
        process.env.NEXT_PUBLIC_RPC_WEBSOCKET ?? '',
        faucetOneSigner
      );

      const result = await signingClient.signAndBroadcast(
        // the signerAddress
        process.env.NEXT_PUBLIC_FAUCET_ADDRESS_ONE ?? '',
        // the message(s)
        [
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              fromAddress: process.env.NEXT_PUBLIC_FAUCET_ADDRESS_ONE ?? '',
              toAddress: receiver,
              amount: [{ denom: 'ulefeef', amount: '1000000' }],
            },
          },
        ],
        // the fee
        {
          amount: [{ denom: 'ulefeef', amount: '200000' }],
          gas: process.env.NEXT_PUBLIC_GAS_AMOUNT ?? '',
        }
      );
      setTxResult(result);
      if (result.code == 0) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    success,
    processTransaction,
    loading,
    txResult,
  };
};
export const useAddress = (t) => {
  const handleCopyToClipboard = (value: string) => {
    copy(value);
    toast(t('common:copied'));
  };

  return {
    handleCopyToClipboard,
  };
};
