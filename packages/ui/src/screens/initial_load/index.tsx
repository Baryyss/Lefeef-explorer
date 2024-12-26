import LinearProgress from '@mui/material/LinearProgress';
import { useRecoilValue } from 'recoil';
import LefeefLogo from 'shared-utils/assets/logos/lefeef_title_dark.svg';
import useStyles from '@/screens/initial_load/styles';
import { readTheme } from '@/recoil/settings';
// import ChainIcon from '@/components/ChainIcon';

const InitialLoad = () => {
  const theme = useRecoilValue(readTheme);
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div>
        {/* <ChainIcon type="icon" className={classes.logo} alt="logo" /> */}
        <LinearProgress className={classes.divider} />
        {theme === 'light' ? <LefeefLogo /> : <LefeefLogo />}
      </div>
    </div>
  );
};

export default InitialLoad;
