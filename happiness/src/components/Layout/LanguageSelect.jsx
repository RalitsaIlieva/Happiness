import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../../src/lib/theme';
import ArrowDropDown from '@mui/icons-material/ArrowDropDownCircle';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const languageMap = {
  en: { label: 'English', dir: 'ltr', active: false },
  bg: { label: 'Български', dir: 'ltr', active: true },
};

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [lng, setLng] = useState('bg');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  };

  const [menuAnchor, setMenuAnchor] = useState(null);
  useEffect(() => {
    document.body.dir = lng;
  }, [menuAnchor, lng]);

  return (
    <div>
      <Button color="secondary" onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {lng}
        <ArrowDropDown fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div>
          <List>
            {Object.keys(languageMap)?.map((item) => (
              <ListItem
                sx={{ cursor: 'pointer' }}
                key={item}
                onClick={() => {
                  changeLanguage(item);
                  setLng(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;
