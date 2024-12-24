import { atom } from 'recoil';

type AtomCreateAccountState = {
  accountBalanceGGEZ: string | null;
  accountBalanceGGEZOne: string | null;
  accountGGEZDenom: string | null;
  accountGGEZOneDenom: string | null;
  accountMnemonic: string | null;
  accountAddress: string | null;
  accountName: string | null;
  accountNumber: string | null;
  accountPublicKey: string | null;
};

const initialState: AtomCreateAccountState = {
  accountBalanceGGEZ: '',
  accountBalanceGGEZOne: '',
  accountGGEZDenom: '',
  accountGGEZOneDenom: '',
  accountMnemonic: '',
  accountAddress: '',
  accountName: '',
  accountNumber: '',
  accountPublicKey: '',
};

export const atomState = atom<AtomCreateAccountState>({
  key: 'createAccount',
  default: initialState,
});
