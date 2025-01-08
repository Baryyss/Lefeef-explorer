import withGetStaticProps from '@/pages/withGetStaticProps';
import Staking from '@/screens/staking';
import type { NextPage } from 'next';
import nextI18NextConfig from '../../../next-i18next.config';

const StakingPage: NextPage = () => <Staking />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'staking',
  'message_labels',
  'message_contents',
  'faucet'
);

export default StakingPage;
