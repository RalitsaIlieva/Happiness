import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
import LanguageSelect from './LanguageSelect';
import { Link } from 'react-router-dom';
import theme from '../../lib/theme';

const tabSX = {
  color: theme.palette.secondary.main,
  '&:hover': {
    border: '1px solid #00FF00',
    backgroundColor: 'rgb(186, 85, 211)',
  },
};

const Header = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation('translation');

  return (
    <>
      <img
        src="https://thumbs.dreamstime.com/b/happy-abstract-people-logo-happiness-family-community-vector-icon-symbol-elements-156766546.jpg"
        alt="Logo"
        width="50"
        height="50"
      />
      <Typography
        color="secondary"
        variant="h6"
        component={Link}
        to="/Happiness"
        sx={{ ml: 2, flexGrow: 1, textDecoration: 'none' }}
      >
        {t('title')}
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        selectionFollowsFocus    
        textColor="secondary"
        TabIndicatorProps={{ sx: { display: 'none' } }}
        sx={{
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label={t('firstHeaderTab')} component={Link} to="/about" sx={tabSX} />
        <Tab label={t('secondHeaderTab')} component={Link} to="/membership" sx={tabSX} />
      </Tabs>
      <LanguageSelect />
    </>
  );
};

export default Header;
