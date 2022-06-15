import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { memo } from 'react';

const AppLoading = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default memo(AppLoading);
