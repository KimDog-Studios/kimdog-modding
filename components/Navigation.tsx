import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#FF0000',
    },
  },
});

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '0 2rem',
  },
  logo: {
    flexGrow: 1,
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
  },
  navButton: {
    color: '#fff',
    position: 'relative',
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05rem',
    '&:hover': {
      color: theme.palette.secondary.main,
      '&::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '2px',
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.secondary.main,
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      transition: 'transform 0.3s ease',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#fff',
  },
  drawer: {
    width: 250,
  },
  drawerItem: {
    textTransform: 'uppercase',
    letterSpacing: '0.05rem',
  },
}));

function Navigation() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <div className={classes.drawer} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem component="div">
          <ListItemButton component="a" href="/">
            <ListItemText primary="Home" className={classes.drawerItem} />
          </ListItemButton>
        </ListItem>
        <ListItem component="div">
          <ListItemButton component="a" href="/pages/gallery">
            <ListItemText primary="Gallery" className={classes.drawerItem} />
          </ListItemButton>
        </ListItem>
        <ListItem component="div">
          <ListItemButton component="a" href="#services">
            <ListItemText primary="Services" className={classes.drawerItem} />
          </ListItemButton>
        </ListItem>
        <ListItem component="div">
          <ListItemButton component="a" href="#contact">
            <ListItemText primary="Contact" className={classes.drawerItem} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            KimDog Modding
          </Typography>
          {isMobile ? (
            <>
              <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
              </Drawer>
            </>
          ) : (
            <>
              <Button className={classes.navButton} href="/">Home</Button>
              <Button className={classes.navButton} href="/pages/gallery">Gallery</Button>
              <Button className={classes.navButton} href="#services">Services</Button>
              <Button className={classes.navButton} href="#contact">Contact</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navigation;