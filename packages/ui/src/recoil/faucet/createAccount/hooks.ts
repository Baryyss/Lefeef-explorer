/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import chainConfigFile from '@/chain.json';
import { Secp256k1HdWallet } from '@cosmjs/launchpad';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { writeCreateAccount } from '@/recoil/faucet/createAccount';
import { AtomCreateAccountState } from '@/recoil/faucet/createAccount/types';

import { Coin, StargateClient } from '@cosmjs/stargate';
import { toBase64 } from '@cosmjs/encoding';

export const useGenerateMnemonicRecoil = () => {
  const [state, setState] = useState<{
    accountMnemonic: string;
    accountAddress: string;
    accountName: string;
    accountNumber: string;
  }>({
    accountMnemonic: '',
    accountAddress: '',
    accountName: '',
    accountNumber: '',
  });
  const chainConfig = JSON.parse(chainConfigFile.keplr);
  const [createAccountData, setCreateAccountData] = useRecoilState(writeCreateAccount) as [
    AtomCreateAccountState,
    SetterOrUpdater<AtomCreateAccountState>,
  ];

  const createNewAccount = async () => {
    const wallet = await Secp256k1HdWallet.generate(24, {
      prefix: 'lefeef',
    });
    const [{ address, pubkey }] = await wallet.getAccounts();
    const encodedPublicKey = toBase64(pubkey);

    const data = {
      accountMnemonic: wallet.mnemonic,
      accountAddress: address,
      accountName: state.accountName ? state.accountName : createAccountData.accountName,
      accountNumber: state.accountNumber ? state.accountNumber : createAccountData.accountNumber,
      accountBalanceGGEZ: '0',
      accountBalanceGGEZOne: '0',
      accountGGEZDenom: chainConfig.primaryTokenUnit,
      accountGGEZOneDenom: chainConfig.votingPowerTokenUnit,
      accountPublicKey: encodedPublicKey,
    };
    wallet && address ? setCreateAccountData(data) : null;
    state.accountAddress = address;
    state.accountMnemonic = wallet.mnemonic;
  };

  const updateAccountBalance = async (client: StargateClient) => {
    if (createAccountData.accountAddress) {
      const balancesFacuetOne: readonly Coin[] = await client.getAllBalances(
        createAccountData.accountAddress
      );

      const balanceGGEZ: Coin = balancesFacuetOne[0];
      const balanceGGEZOne: Coin = balancesFacuetOne[1];

      const data = {
        accountMnemonic: createAccountData.accountMnemonic,
        accountAddress: createAccountData.accountAddress,
        accountName: createAccountData.accountName,
        accountNumber: createAccountData.accountNumber,
        accountBalanceGGEZ: balanceGGEZ ? balanceGGEZ.amount : '0',
        accountBalanceGGEZOne: balanceGGEZOne ? balanceGGEZOne.amount : '0',
        accountGGEZDenom: chainConfig.primaryTokenUnit,
        accountGGEZOneDenom: chainConfig.votingPowerTokenUnit,
        accountPublicKey: createAccountData.accountPublicKey,
      };

      createAccountData.accountMnemonic && createAccountData.accountAddress
        ? setCreateAccountData(data)
        : null;
    }
  };

  const initCreateAccount = async () => {
    updateAccountBalance(await StargateClient.connect(process.env.NEXT_PUBLIC_RPC_WEBSOCKET ?? ''));
  };

  return {
    state,
    createNewAccount,
    createAccountData,
    initCreateAccount,
  };
};
