/* eslint-disable jsx-a11y/interactive-supports-focus */
import useStyles from '@/components/nav/components/mobile/components/navbar/styles';
import type { NavbarProps } from '@/components/nav/components/mobile/components/navbar/types';
import useAppTranslation from '@/hooks/useAppTranslation';
import { readTheme } from '@/recoil/settings';
import { HOME } from '@/utils/go_to_page';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from '@mui/material';
import LefeefLogoLight from 'shared-utils/assets/logos/lefeef-light-phone.svg';

const Navbar = (props: NavbarProps) => {
  const { classes, cx } = useStyles();
  const theme = useRecoilValue(readTheme);
  const { isOpen, toggleNavMenus } = props;
  const { t } = useAppTranslation('common');
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
    <div className={classes.root}>
      <Link shallow href={HOME} className={classes.a}>
        {theme === 'light' ? (
          <LefeefLogoLight className={classes.logo} />
        ) : (
          <LefeefLogoLight className={classes.logo} />
        )}
      </Link>
      <div className={classes.actions}>
        {/* =================================== */}
        {/* Network */}
        {/* =================================== */}
        <div
          className={classes.network}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          role="button"
        >
          <Typography variant="body1">
            {process.env.NEXT_PUBLIC_CHAIN_TYPE === 'testnet' ? t('testnet') : t('mainnet')}
          </Typography>
          <ExpandMoreIcon fontSize="small" />
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
              minWidth: 50,
            },
          }}
        >
          {menuItems.map((item) => (
            <Link key={item.url} href={item.url} passHref>
              <MenuItem onClick={handleClose}>{item.label}</MenuItem>
            </Link>
          ))}
        </Menu>
        {/* =================================== */}
        {/* Hamburger */}
        {/* =================================== */}
        <div
          role="button"
          onClick={toggleNavMenus}
          className={cx(classes.hamburger, {
            active: isOpen,
          })}
          tabIndex={0}
          aria-label={isOpen ? 'close navigation menu' : 'open navigation menu'}
        >
          <div className="hamburger-content" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
