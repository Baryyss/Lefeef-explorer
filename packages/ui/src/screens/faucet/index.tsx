import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';
import Layout from '@/components/layout';
import useStyles from './styles';
import { CreateAccount, TestTransaction } from './component';

const Faucet = () => {
  const { t } = useAppTranslation('faucet');
  const { classes } = useStyles();
  return (
    <>
      <NextSeo title={t('faucet')} openGraph={{ title: t('faucet') }} />

      <Layout className={classes.root} navTitle={t('faucet')}>
        <CreateAccount className={classes.createAccount} />
        <TestTransaction className={classes.tryout} />
      </Layout>
    </>
  );
};

export default Faucet;
