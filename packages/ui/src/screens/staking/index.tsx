import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import Box from '@/components/box';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import TransactionsList from '@/components/transactions_list';
import TransactionsListDetails from '@/components/transactions_list_details';
import { readTx } from '@/recoil/settings';
import { writeFilter, writeSelectedMsgTypes } from '@/recoil/transactions_filter';
import { useTransactions } from '@/screens/transactions/hooks';
import useStyles from '@/screens/transactions/styles';
import { useEffect } from 'react';
import { useStaking } from './hooks';

const Staking = () => {
  const txListFormat = useRecoilValue(readTx);
  const { t } = useAppTranslation('staking');
  const { classes } = useStyles();
  const { state, loadNextPage } = useTransactions();
  const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
  const isItemLoaded = (index: number) => !state.hasNextPage || index < state.items.length;
  const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;
  const [, setMsgTypes] = useRecoilState(writeFilter) as [string, SetterOrUpdater<string>];
  const [, setSelectedMsgs] = useRecoilState(writeSelectedMsgTypes) as [
    string[],
    SetterOrUpdater<string[]>,
  ];
  useEffect(() => {
    setMsgTypes('{}');
    setSelectedMsgs([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { test } = useStaking();
  test();
  return (
    <>
      <NextSeo
        title={t('staking') ?? undefined}
        openGraph={{
          title: t('staking') ?? undefined,
        }}
      />
      <Layout navTitle={t('staking') ?? undefined} className={classes.root}>
        <LoadAndExist exists={state.exists} loading={state.loading}>
          <Box className={classes.box}>{/* <></> */}</Box>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Staking;
