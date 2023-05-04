import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar from '@mui/material/AppBar';
import { Avatar, Container, Box, Button, List, Divider} from '@mui/material';


  function NavBar() {
  
    const theme = useTheme();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [open, setOpen] = useState(false);
    const pages = ["Introduction", "Interviews", "Citations", "Livres", "Aides"];
    const drawerWidth = 240;

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    /*const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
      ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }),
      }),
    );*/

    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

    return (
      <div className="NavBar">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton href="/" component="a" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                <Avatar sx={{width:'100%', height:'150px'}} alt="logo" src="./logoSansFond.png"/>
              </IconButton>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => {
                    handleOpenNavMenu();
                    handleDrawerOpen();
                  }}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <IconButton href="/" component="a" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                <Avatar sx={{width:'100%', height:'100px'}} alt="logo" src="./logoSansFond.png"/>
              </IconButton>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => {
            handleDrawerClose();
            handleCloseNavMenu();
          }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      </div>
    );
  }
  
export default NavBar;