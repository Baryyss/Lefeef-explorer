import withGetStaticProps from '@/pages/withGetStaticProps';
import Faucet from '@/screens/faucet';
import type { NextPage } from 'next';
import nextI18NextConfig from '../../../next-i18next.config';

const FaucetPage: NextPage = () => process.env.NEXT_PUBLIC_CHAIN_TYPE !== 'mainnet' && <Faucet />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'transactions',
  'message_labels',
  'message_contents',
  'faucet'
);

export default FaucetPage;
