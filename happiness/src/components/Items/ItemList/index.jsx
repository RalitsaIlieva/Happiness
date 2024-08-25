import { Box, Paper, Skeleton, Tab, Table, TableBody, TableHead } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, useEffect } from 'react';
import { useGetDocs, useOnSnapshot } from '../../../lib/firebase/db';

import ItemRow, { ItemHeader, LoadingItemRow } from './ItemRow';

const ItemList = () => {
  const { organisations, loading, activeOrganisations, setActiveOrganisations } = useItemTypes();

  return (
    <Paper>
      {loading ? (
        <Loading />
      ) : (
        <TabContext value={activeOrganisations}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(_, id) => setActiveOrganisations(id)}>
              {organisations.map(({ id, name }) => (
                <Tab label={name} value={id} key={id} />
              ))}
            </TabList>
          </Box>
          {organisations.map(({ id }) => (
            <TabPanel value={id} key={id} sx={{ p: 0 }}>
              <ItemTable itemTypeId={id} />
            </TabPanel>
          ))}
        </TabContext>
      )}
    </Paper>
  );
};

export default ItemList;

const useItemTypes = () => {
  const { data: organisations, loading } = useGetDocs({ path: 'organisations' });
  const [activeOrganisations, setActiveOrganisations] = useState();

  useEffect(() => {
    if (!loading) setActiveOrganisations(organisations[0].id);
  }, [organisations, loading]);

  return {
    organisations,
    activeOrganisations,
    setActiveOrganisations,
    loading: !activeOrganisations,
  };
};

const Loading = () => (
  <>
    <Skeleton variant="text" sx={{ mx: 2 }} />
    <Skeleton variant="rectangular" height={100} sx={{ m: 2 }} />
  </>
);

const ItemTable = ({ itemTypeId }) => {
  const { data, loading } = useOnSnapshot({ path: ['organisations', itemTypeId] });

  return (
    <Table>
      <TableHead>
        <ItemHeader />
      </TableHead>
      <TableBody>
        {loading ? <LoadingItemRow /> : data.map((item) => <ItemRow item={item} key={item.id} />)}
      </TableBody>
    </Table>
  );
};
