import React from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#FF0000',
    },
  },
})

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
}))

function Navigation() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.logo}>
            KimDog Modding
          </Typography>
          <Button className={classes.navButton} href="/">Home</Button>
          <Button className={classes.navButton} href="/pages/gallery">Gallery</Button>
          <Button className={classes.navButton} href="#services">Services</Button>
          <Button className={classes.navButton} href="#contact">Contact</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navigation