/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import useStyles from '@/components/nav/components/desktop/components/action_bar/components/network/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Menu, MenuItem } from '@mui/material';
import chainConfig from '@/chainConfig';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useRecoilValue } from 'recoil';
import { readTheme } from '@/recoil/settings';

type NetworkProps = {
  className?: string;
  // toggleNetwork: () => void;
};

const Network: FC<NetworkProps> = ({
  className,
  //  toggleNetwork
}) => {
  const { classes, cx } = useStyles();
  const { t } = useAppTranslation('common');
  const { i18n } = useTranslation('common');
  const lang = i18n.language;
  const theme = useRecoilValue(readTheme);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems =
    process.env.NEXT_PUBLIC_CHAIN_TYPE === 'testnet'
      ? [
          { label: t('testnet'), url: 'https://testnet.lefeef.network' },
          { label: t('mainnet'), url: 'https://mainnet.lefeef.network' },
        ]
      : [
          { label: t('mainnet'), url: 'https://mainnet.lefeef.network' },
          { label: t('testnet'), url: 'https://testnet.lefeef.network' },
        ];
  return (
    <div>
      <div
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className={cx(className, classes.root)}
        onClick={handleClick}
        role="button"
      >
        {lang === 'en' ? (
          <img src={chainConfig().icon} className={classes.icon} alt="icon" />
        ) : (
          <img src={chainConfig().icon} className={classes.icon} alt="icon" />
        )}

        <Typography variant="body1">
          {process.env.NEXT_PUBLIC_CHAIN_TYPE === 'testnet' ? t('testnet') : t('mainnet')}
        </Typography>
        <ExpandMoreIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted
        onClick={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{
          style: {
            minWidth: 150,
          },
        }}
      >
        {menuItems.map((item) => (
          <Link key={item.url} href={item.url} passHref target="_blank">
            <MenuItem onClick={handleClose} style={{ color: theme === 'dark' ? 'white' : 'black' }}>
              {item.label}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

export default Network;
