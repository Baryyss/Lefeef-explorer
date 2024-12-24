import { selector } from 'recoil';
import { mergeStateChange } from '@/utils/merge_state_change';
import { atomState } from './atom';
import { AtomCreateAccountState } from './types';

const getCreateAccount = ({ get }): AtomCreateAccountState => {
  const state = get(atomState);

  return state;
};

export const writeCreateAccount = selector({
  key: 'faucet.write.CreateAccount',
  get: getCreateAccount,
  set: ({ get, set }, value: AtomCreateAccountState) => {
    const prevState = get(atomState);
    const newState = mergeStateChange(prevState, value);
    set(atomState, newState);
  },
});

export const readCreateAccount = selector({
  key: 'faucet.read.CreateAccount',
  get: getCreateAccount,
});
