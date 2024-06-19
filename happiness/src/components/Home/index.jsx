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

const Home = () => {
  const { data: organisations } = useGetDocs({ path: 'organisations' });
  const [openFilter, setOpenFilter] = useState(false);
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
          <Grid item xs={2}>
            <FilterList />
          </Grid>
        )}
        <Grid item container justifyContent="center" xs={8}>
          <Grid item>
            <ImageList
              sx={{
                gap: (theme) => theme.spacing(2),
              }}
              cols={columnNumber}
              rowHeight={isDesktop ? 300 : 'auto'}
            >
              {organisations.map((org) => (
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
