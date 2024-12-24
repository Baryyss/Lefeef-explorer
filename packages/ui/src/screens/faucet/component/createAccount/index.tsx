/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TutorialLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import useAppTranslation from '@/hooks/useAppTranslation';
import Box from '@/components/box';
import { useGenerateMnemonicRecoil, writeCreateAccount } from '@/recoil/faucet/createAccount';
import CopyIcon from 'shared-utils/assets/icon-copy.svg';
import { ACCOUNT_DETAILS } from '@/utils/go_to_page';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import ShareIcon from 'shared-utils/assets/icon-share.svg';
import QRCode from 'qrcode.react';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AtomCreateAccountState } from '@/recoil/faucet/createAccount/types';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { useWindowOrigin } from '@/hooks/use_window';
import Button from '@mui/material/Button';
import { useOverview } from './hooks';
import { useStyles } from './styles';

const CreateAccount: React.FC<{
  className?: string;
}> = ({ className }) => {
  const data = {
    accountMnemonic: '',
    accountAddress: '',
    accountName: '',
    accountNumber: '',
    accountBalanceGGEZ: '0',
    accountBalanceGGEZOne: '0',
    accountGGEZDenom: '',
    accountGGEZOneDenom: '',
    accountPublicKey: '',
  };
  const { location } = useWindowOrigin();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [account, setAccount] = useRecoilState(writeCreateAccount) as [
    AtomCreateAccountState,
    SetterOrUpdater<AtomCreateAccountState>,
  ];
  const { t, i18n } = useAppTranslation('faucet');
  const lang = i18n.language;
  const { open, handleClose, handleOpen, handleCopyToClipboard } = useOverview(t);
  const [loading, setLoading] = useState(false);

  const { classes, cx, theme } = useStyles();
  const { createNewAccount, createAccountData } = useGenerateMnemonicRecoil();

  const mnemonic = createAccountData.accountMnemonic
    ? createAccountData.accountMnemonic
    : t('pleaseCreateNewAccount');
  const address = createAccountData.accountAddress
    ? createAccountData.accountAddress
    : t('pleaseCreateNewAccount');
  const pubKey = createAccountData.accountPublicKey
    ? createAccountData.accountPublicKey
    : t('pleaseCreateNewAccount');
  const [showAlert, setShowAlert] = useState(false);
  const createAccount = () => {
    createNewAccount();
    setLoading(true);
    setShowAlert(true);
  };

  useEffect(() => {
    if (createAccountData.accountAddress && createAccountData.accountMnemonic) {
      setLoading(false);
    }
  }, [createAccountData]);

  const url = `${location}/accounts/${address}`;
  const hashTags = ['ggezexplorer', 'ggez'];

  const reset = () => {
    setAccount(data);
    setShowAlert(false);
  };

  return (
    <Box className={cx(className, classes.root)}>
      <div className={classes.label}>
        <Typography variant="h2">{t('createAccount')}</Typography>
      </div>

      <>
        <Dialog
          maxWidth="xl"
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <Box className={classes.dialog}>
            <Typography variant="body1" align="center">
              {t('scanForAddress')}
            </Typography>
            <QRCode value={address} size={200} bgColor="#ffffff" fgColor="#000000" renderAs="svg" />
            <div className="dialog__share--wrapper">
              <Typography variant="body1">{t('shareTo')}</Typography>
              <div className={classes.icons}>
                <FacebookShareButton
                  url={url}
                  quote={address}
                  hashtag={hashTags[0]}
                  className="share-buttons"
                >
                  <FacebookIcon round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={url}
                  title={address}
                  hashtags={hashTags}
                  className="share-buttons"
                >
                  <TwitterIcon round />
                </TwitterShareButton>

                <TelegramShareButton url={url} title={address} className="share-buttons">
                  <TelegramIcon round />
                </TelegramShareButton>

                <WhatsappShareButton
                  url={url}
                  title={address}
                  separator=":: "
                  className="share-buttons"
                >
                  <WhatsappIcon round />
                </WhatsappShareButton>
                <EmailShareButton
                  url={url}
                  subject="address"
                  body={address}
                  separator=":: "
                  className="share-buttons email"
                >
                  <EmailIcon round />
                </EmailShareButton>
              </div>
            </div>
          </Box>
        </Dialog>
        <div className={classes.flexDev}>
          <div className={classes.legends}>
            <div className={cx(classes.copyText)}>
              <Typography variant="caption">{t('address')}:</Typography>
              <div className="detail">
                {address != t('pleaseCreateNewAccount') ? (
                  <>
                    <CopyIcon
                      className={classes.actionIcons}
                      onClick={() => handleCopyToClipboard(address)}
                    />

                    <ShareIcon onClick={handleOpen} className={classes.actionIcons} />
                    <Link href={ACCOUNT_DETAILS(address)} passHref>
                      <Typography variant="body1" className="valueAddress" component="a">
                        {getMiddleEllipsis(address, {
                          beginning: 15,
                          ending: 5,
                        })}{' '}
                      </Typography>
                    </Link>
                  </>
                ) : (
                  <Typography variant="body1" className="label" style={{ marginRight: '-5%' }}>
                    {address}
                  </Typography>
                )}
              </div>
            </div>
          </div>
          <div className={classes.pubKey}>
            <div className={cx(classes.copyText)}>
              <Typography variant="caption">{t('publicKey')}</Typography>

              <div className="detail">
                {pubKey != t('pleaseCreateNewAccount') ? (
                  <>
                    <CopyIcon
                      className={classes.actionIcons}
                      onClick={() => handleCopyToClipboard(pubKey)}
                    />

                    <Typography variant="body1" className="label">
                      {getMiddleEllipsis(pubKey, {
                        beginning: 10,
                        ending: 5,
                      })}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" className="label" style={{ marginRight: '-5%' }}>
                    {pubKey}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.menomic}>
          <div className={cx(classes.copyText)}>
            <Typography variant="caption">{t('accountMenomic')}:</Typography>
            <div className="detail">
              {mnemonic != t('pleaseCreateNewAccount') ? (
                <>
                  <CopyIcon
                    className={classes.actionIcons}
                    onClick={() => handleCopyToClipboard(mnemonic)}
                  />

                  <Typography variant="body1" className="value">
                    {mnemonic}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="body1"
                  className="value"
                  style={{
                    width: '100%',
                    textAlign: lang == 'ar' ? 'right' : 'left',
                  }}
                >
                  {mnemonic}
                </Typography>
              )}
            </div>
          </div>
        </div>

        <div className={classes.alert}>
          {showAlert ? (
            <Alert severity="success">
              <AlertTitle>{t('accountSuccessfullyCreated')}</AlertTitle>
              <Typography>{t('keepYourMnemonicInSafePlace')}</Typography>
              <TutorialLink
                href="https://docs.evmos.org/use/connect-your-wallet/keplr"
                target="_blank"
              >
                {t('importYourKeplrAccount')}
              </TutorialLink>
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <div className={classes.buttons}>
          <Button
            style={{ minWidth: 100, height: 40 }}
            size="small"
            color="primary"
            className={classes.button}
            onClick={createAccount}
            startIcon={
              <PersonAddIcon
                style={{
                  color: createAccountData.accountAddress
                    ? '#b6b6b6'
                    : theme.palette.primary.contrastText,
                }}
              />
            }
            variant="contained"
            disabled={createAccountData.accountAddress != ''}
          >
            <span
              style={{
                paddingRight: lang == 'ar' ? 8 : 0,
              }}
            >
              {' '}
              {t('createNewAccount').toLocaleUpperCase()}{' '}
            </span>
          </Button>

          <Button
            style={{
              minWidth: 100,
              height: 40,
              marginLeft: lang == 'ar' ? 0 : '2%',
              marginRight: lang == 'ar' ? '2%' : 0,
            }}
            className={classes.button}
            size="small"
            color="primary"
            onClick={reset}
            startIcon={<RefreshIcon style={{ color: 'white' }} />}
            variant="contained"
          >
            <span
              style={{
                paddingRight: lang === 'ar' ? 5 : 0,
                color: theme.palette.primary.contrastText,
              }}
            >
              {' '}
              {t('reset').toLocaleUpperCase()}{' '}
            </span>
          </Button>
        </div>
      </>
    </Box>
  );
};

export default CreateAccount;
