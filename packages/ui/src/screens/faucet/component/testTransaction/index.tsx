import React, { useState } from 'react';
import useAppTranslation from '@/hooks/useAppTranslation';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Alert, AlertTitle } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { TRANSACTION_DETAILS } from '@/utils/go_to_page';
import Link from 'next/link';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import Box from '@/components/box';
import { useStyles } from './styles';
import { useTestTransaction } from './hooks';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

const TestTransaction: React.FC<ComponentDefault> = ({ className }) => {
  const { classes, theme } = useStyles();
  const { t, i18n } = useAppTranslation('faucet');
  const lang = i18n.language;
  const [receiver, setReceiver] = useState<string>('');
  const { success, processTransaction, loading, txResult } = useTestTransaction();

  return (
    <Box className={className}>
      <Typography variant="h2" className={classes.title}>
        {t('faucet')}
      </Typography>

      <div className={classes.addressRoot}>
        <div>
          <div className={classes.SelectBox} style={{ display: 'flex', alignItems: 'end' }}>
            <FormControl sx={{ width: '90%' }}>
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">5</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                onChange={(e) => setReceiver(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <br />
        <div className={classes.label} style={{ alignItems: 'center' }}>
          <LoadingButton
            style={{
              float: 'left',
              minWidth: 100,
              height: 40,
              marginLeft: lang == 'ar' ? '4%' : 0,
            }}
            size="small"
            color="primary"
            onClick={() => processTransaction(receiver)}
            startIcon={<SendIcon style={{ color: theme.palette.primary.contrastText }} />}
            className={classes.button}
            variant="contained"
            disabled={loading}
            loading={loading}
            loadingPosition="start"
          >
            <span
              style={{
                paddingRight: lang == 'ar' ? 5 : 0,
              }}
            >
              {' '}
              {t('process').toLocaleUpperCase()}
            </span>
          </LoadingButton>
        </div>

        <div className={classes.label}>
          {txResult && loading == false ? (
            <>
              <div style={{ width: '100%' }}>
                <Alert severity={success ? 'success' : 'error'}>
                  <AlertTitle>
                    {success ? t('transactionCompletedSuccessfully') : t('error')}
                  </AlertTitle>
                  <Typography variant="body1" className={classes.resultLabel}>
                    {success && t('hash')}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes?.resultLabel}
                    style={{ maxWidth: 150 }}
                  >
                    {success ? (
                      <Link href={TRANSACTION_DETAILS(txResult?.transactionHash)} passHref>
                        {getMiddleEllipsis(txResult?.transactionHash, {
                          beginning: 15,
                          ending: 5,
                        })}
                      </Link>
                    ) : (
                      txResult?.rawLog
                    )}
                  </Typography>
                </Alert>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Box>
  );
};

export default TestTransaction;
