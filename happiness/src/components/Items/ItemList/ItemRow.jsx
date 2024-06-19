import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-polyglot';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Box,
  Collapse,
  IconButton,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import useIsMobile from '../../../lib/useIsMobile';

const ItemRow = ({ item: { id, name, serialNumber, purchaseDate, description, docPath } }) => {
  const t = useTranslate();
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell padding="checkbox" sx={{ borderBottom: 'unset' }}>
          <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell>{serialNumber}</TableCell>
        <TableCell>{purchaseDate.toDate().toLocaleDateString()}</TableCell>
        {!isMobile && (
          <TableCell align="right" padding="none" sx={{ width: '7rem', borderBottom: 'unset' }}>
            <IconButton component={Link} to={`/items/${id}/edit`} sx={{ mr: 1 }}>
              <EditIcon color="primary" fontSize="small" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle2">{t('items.description')}</Typography>
              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>
              <Typography variant="subtitle2">{t('items.documents')}</Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              <Typography variant="body1">
                <Skeleton />
              </Typography>
              {isMobile && (
                <Box>
                  <IconButton component={Link} to={`/items/${id}/edit`} sx={{ mr: 1 }}>
                    <EditIcon color="primary" fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ItemRow;

export const ItemHeader = () => {
  const t = useTranslate();
  const isMobile = useIsMobile();

  return (
    <TableRow>
      <TableCell padding="checkbox" />
      <TableCell>{t('items.name')}</TableCell>
      <TableCell>{t('items.serialNumber')}</TableCell>
      <TableCell>{t('items.purchaseDate')}</TableCell>
      {!isMobile && <TableCell />}
    </TableRow>
  );
};

export const LoadingItemRow = () => {
  const isMobile = useIsMobile();
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell />
      <TableCell component="th" scope="row">
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      {!isMobile && (
        <TableCell align="right" padding="none" sx={{ width: '7rem' }}>
          <Skeleton
            variant="circular"
            width={28}
            height={28}
            sx={{ display: 'inline-block', mr: 1 }}
          />
          <Skeleton
            variant="circular"
            width={28}
            height={28}
            sx={{ display: 'inline-block', mr: 1 }}
          />
        </TableCell>
      )}
    </TableRow>
  );
};
