import { atom } from 'recoil';

type AtomCreateAccountState = {
  accountBalanceLefeef: string | null;
  accountBalanceLefeefOne: string | null;
  accountLefeefDenom: string | null;
  accountLefeefOneDenom: string | null;
  accountMnemonic: string | null;
  accountAddress: string | null;
  accountName: string | null;
  accountNumber: string | null;
  accountPublicKey: string | null;
};

const initialState: AtomCreateAccountState = {
  accountBalanceLefeef: '',
  accountBalanceLefeefOne: '',
  accountLefeefDenom: '',
  accountLefeefOneDenom: '',
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
