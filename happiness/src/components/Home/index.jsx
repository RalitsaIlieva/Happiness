import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetDocs } from '../../../src/lib/firebase/db';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Pagination from './OrganisationsPagination';

const Home = () => {
  const { data: organisations, loading } = useGetDocs({ path: 'organisations' });
  const [openFilter, setOpenFilter] = useState(false);
  const [checked, setChecked] = useState([]);
  const [filtered, setFiltered] = useState(organisations);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation('translation');
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;

  const organisationsPerPage = 4;
  const indexOfLastOrganisation = currentPage * organisationsPerPage;
  const indexOfFirstOrganisation = indexOfLastOrganisation - organisationsPerPage;
  const currentOrganisations = organisations.slice(
    indexOfFirstOrganisation,
    indexOfLastOrganisation,
  );
  let currentFilteredOrganisations;
  if (filtered) {
    currentFilteredOrganisations = filtered.slice(
      indexOfFirstOrganisation,
      indexOfLastOrganisation,
    );
  }
  const handlePagination = (pageNumber) => {
    if (filtered && filtered.length < organisationsPerPage) {
      setCurrentPage(1);
    }
    setCurrentPage(pageNumber);
  };

  let columnNumber;
  if (isDesktop) {
    columnNumber = 4;
  } else if (isTablet) {
    columnNumber = 2;
  } else {
    columnNumber = 1;
  }

  const categories = [...new Set(organisations.map((o) => o.category))];
  const handleToggle = (value) => () => {
    const currentIndex = Object.values(checked).indexOf(value);

    const newChecked = [...Object.values(checked)];
    if (currentIndex === -1 && !newChecked.includes(value)) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setFiltered(organisations.filter((o) => newChecked.includes(o.category)));
  };

  return (
    <>
      <Button
        onClick={() => setOpenFilter(!openFilter)}
        startIcon={<FilterListIcon fontSize="large" />}
        sx={!isDesktop && {marginTop: "30px"}}
      >
        {t('filter')}
      </Button>
      <Grid container>
        {openFilter && (
          <List
            sx={{ bgcolor: 'background.paper', [theme.breakpoints.up('md')]: { display: 'flex' } }}
          >
            {categories.map((value) => {
              const labelId = { value };

              return (
                <ListItem key={value} disablePadding sx={{ display: 'flex', width: '80%' }}>
                  <ListItemButton onClick={handleToggle(value)}>
                    <ListItemIcon sx={{ minWidth: '0%' }}>
                      <Checkbox
                        edge="start"
                        checked={checked?.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
        <Grid item container justifyContent="center">
          <Grid item>
            <ImageList
              sx={{
                overflow: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '&-ms-overflow-style:': {
                  display: 'none',
                },
              }}
              cols={columnNumber}
              rowHeight={theme.breakpoints.up('md') ? 300 : 'auto'}
            >
              {filtered &&
                currentFilteredOrganisations.map((org) => (
                  <ImageListItem
                    key={org.id}
                    sx={(theme) => ({
                      [theme.breakpoints.up('lg')]: { width: '290px' },
                    })}
                  >
                    <img
                      src={`${org.picture}`}
                      alt={org.name}
                      loading="lazy"
                      onClick={() => navigate(`/${org.id}`)}
                    />
                    <ImageListItemBar
                      title={org.name}
                      subtitle={org.priceCents}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          onClick={() => navigate(`/${org.id}`)}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              {(!filtered || checked.length === 0) &&
                currentOrganisations.map((org) => (
                  <ImageListItem
                    key={org.id}
                    sx={(theme) => ({
                      [theme.breakpoints.up('lg')]: { width: '290px' },
                    })}
                  >
                    <img
                      src={`${org.picture}`}
                      alt={org.name}
                      loading="lazy"
                      onClick={() => navigate(`/${org.id}`)}
                    />
                    <ImageListItemBar
                      title={org.name}
                      subtitle={org.priceCents}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          onClick={() => navigate(`/${org.id}`)}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </Grid>
        </Grid>
        {(filtered && filtered.length > organisationsPerPage) ||
        !filtered ||
        checked.length === 0 ? (
          <Pagination
            length={organisations.length}
            postsPerPage={organisationsPerPage}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        ) : null}
      </Grid>
    </>
  );
};

export default Home;
