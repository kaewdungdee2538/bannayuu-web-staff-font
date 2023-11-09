import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// component
import SvgIconStyle from './SvgIconStyle';
// ----------------------------------------------------------------------

LogoExcel.propTypes = {
  sx: PropTypes.object,
};
const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;
export default function LogoExcel({ sx }) {
  const logo = (
    <Box sx={{ width: 80, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx }}>
      {getIcon('ic_excel')}
    </Box>
  );

  return <>{logo}</>;
}
