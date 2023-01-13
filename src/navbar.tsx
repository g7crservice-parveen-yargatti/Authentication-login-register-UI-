import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { deleteToken, isLoggedIn } from './config';
import { useState } from 'react';
import { deepPurple } from '@mui/material/colors';

let pages:any =[]

const settings = ['SignOut'];

function HeaderNavBar() {
  const[show,setShow]=useState(false)
  if (isLoggedIn()){
    let name=sessionStorage.getItem("userName")
    pages=['About', 'Movies', `${name}`];
    
 }else{
   pages=['About', 'Movies', 'SignIn/SignUp'];
   
 }
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const[avtar,setAvtar]=useState("A")
 

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate=useNavigate()
  const handleCloseNavMenu = (pages:any) => {
    if(pages=='SignIn/SignUp'){
      console.log("hi");      
     navigate('/Signin')
    }
    else if(pages=='Movies'){
      navigate('/pages/movies')

    }else if(pages=='About'){
      navigate('/about')
    }
    else if(pages=='SignOut' ){
      deleteToken()
      navigate('/Signin')
      setShow(false)
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(()=>{
    if(isLoggedIn()){
      setShow(true)
      if(sessionStorage!=null){
      let name:any=sessionStorage.getItem("userName")
      setAvtar(name.charAt(0).toUpperCase())
      }

    }

  },[])
  
  return (
    <AppBar position="static" color='inherit' style={{backgroundColor:'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdminPanelSettingsIcon sx={{ display: { xs: 'none', md: 'flex',color: 'white' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Authentication 
          </Typography>
          {/* hamburger */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },color:'white' }}>
            <IconButton
              size="large"
              aria-label="user"
              aria-controls="menu-navbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
  
            >
             <MenuIcon />
            </IconButton>
            <Menu
               
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                
                display: {xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page:any) => (
                <MenuItem key={page} onClick={(e:any)=>{handleCloseNavMenu(e)
                  handleCloseNavMenu (page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* middle icon */}
          <AdminPanelSettingsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 ,color:'white'}} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Authentication
          </Typography>
          {/* buttons on navbar */}
          <Box 

           m={1}
            display="flex"
           justifyContent="flex-end"
           alignItems="flex-end" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page:any) => (
              <Button
                key={page}
                onClick={()=>{handleCloseNavMenu(page)}}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box>

          { show &&<Box sx={{ flexGrow: 0 }}>
             <Tooltip title="Logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{avtar}</Avatar>
              </IconButton>
            </Tooltip> 
             <Menu
              sx={{ mt: '45px' }}
              id="menu-navbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>{handleCloseNavMenu (setting)}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> 
          </Box> }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderNavBar;
