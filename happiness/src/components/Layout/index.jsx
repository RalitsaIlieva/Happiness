import { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

import { useEnsureAuth } from '../../../src/lib/firebase/auth';
import useIsMobile from '../../../src/lib/useIsMobile';

import Header from './Header';
import Content from './Content';
import Sidebar from './Sidebar';

const Layout = () => {
  useEnsureAuth();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(isMobile);

  const toolbar = (
    <Toolbar>
      {/* {!open && (
        <IconButton
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          edge="start"
          color="inherit"
          size="large"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )} */}
      <Header />
    </Toolbar>
  );

  const sidebar = (
    <>
      <DrawerHeader>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Sidebar open={open} />
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* {isMobile ? (
        <MuiAppBar position="fixed">{toolbar}</MuiAppBar>
      ) : (*/}
      <AppBar position="fixed" open={open} sx={{width: "100%"}}>
         {toolbar}
        </AppBar>
    {/*  )}
      {isMobile ? (
        <MuiDrawer
          container={container}
          variant="temporary"
          open={open}
          onClose={() => setOpen((prev) => !prev)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {sidebar}
        </MuiDrawer>
      ) : (
        <MiniDrawer variant="permanent" open={open}>
          {sidebar}
        </MiniDrawer>
      )} */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 6 }}>
        {/* <DrawerHeader /> */}
        <Content />
      </Box>
    </Box>
  );
};

export default Layout;

const drawerWidth = 240;
const container = window !== undefined ? () => window.document.body : undefined;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MiniDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    // flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
