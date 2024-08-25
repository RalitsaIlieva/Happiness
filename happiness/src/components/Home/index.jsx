import { useState } from 'react';
import { useGetDocs } from '../../../src/lib/firebase/db';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterList from '../FilterList';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const Home = () => {
  const { data: organisations } = useGetDocs({ path: 'organisations' });
  const [openFilter, setOpenFilter] = useState(false);
  const [checked, setChecked] = useState([]);
  const [filtered, setFiltered] = useState(organisations)
  const { t } = useTranslation('translation');
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  let columnNumber;
  if (isDesktop) {
    columnNumber = 4;
  } else if (isTablet) {
    columnNumber = 2;
  } else {
    columnNumber = 1;
  }
  if (!organisations) return null;
  const categories = [...new Set(organisations.map(o=>o.category))];
  const handleToggle = (value) => () => {
    const currentIndex = Object.values(checked).indexOf(value);

    const newChecked = [...Object.values(checked)];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
setFiltered(organisations.filter(o=>newChecked.includes(o.category)));
  };
  return (
    <>
      <Button
        onClick={() => setOpenFilter(!openFilter)}
        startIcon={<FilterListIcon fontSize="large" />}
      >
        {t('filter')}
      </Button>
      <Grid container>
        {openFilter && (
          <Grid item xs={12}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {categories.map((value) => {
                const labelId = { value };

                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked?.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        )}
        <Grid item container justifyContent="center" xs={12}>
          <Grid item>
            <ImageList
              sx={{
                gap: (theme) => theme.spacing(2),
                overflow: "auto",
                scrollbarWidth: "none", // Hide the scrollbar for firefox
                '&::-webkit-scrollbar': {
                    display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                },
                '&-ms-overflow-style:': {
                    display: 'none', // Hide the scrollbar for IE
                },
              }}
              cols={columnNumber}
              rowHeight={isDesktop ? 300 : 'auto'}
            >
              {filtered && filtered.map((org) => (
                <ImageListItem
                  key={org.id}
                  sx={(theme) => ({
                    [theme.breakpoints.up('md')]: { width: '300px' },
                  })}
                >
                  <img src={`${org.picture}`} alt={org.name} loading="lazy"/>
                  <ImageListItemBar
                    title={org.name}
                    subtitle={org.priceCents}
                    actionIcon={
                      <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
              {(!filtered || checked.length ===0) && organisations.map((org) => (
                <ImageListItem
                  key={org.id}
                  sx={(theme) => ({
                    [theme.breakpoints.up('md')]: { width: '300px' },
                  })}
                >
                  <img src={`${org.picture}`} alt={org.name} loading="lazy" />
                  <ImageListItemBar
                    title={org.name}
                    subtitle={org.priceCents}
                    actionIcon={
                      <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
