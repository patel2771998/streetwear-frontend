import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';
import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/router';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import NextLink from 'next/link';


const AccountMenu = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  console.log(props);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div key="myaccountMenu">
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar style={{ background: "#000", borderRadius: "50%", border: '1px solid white', fontSize: '15px' }} sx={{ width: 32, height: 32 }}>{(props.profile.first_name) ? props.profile.first_name.charAt(0) : "M"}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem>
            <Avatar /> Profile
        </MenuItem> */}
        {
          (props.profile.email) ?
            <MenuItem key="myaccount">

              <Avatar /> My account
            </MenuItem>
            :
            <>
              <MenuItem key="login">
                <NextLink href="/login">
                  <a>
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    Login
                  </a>
                </NextLink>
              </MenuItem>
              <MenuItem key="register">
                <NextLink href="/register">
                  <a>
                    <ListItemIcon>
                      <HowToRegIcon fontSize="small" />
                    </ListItemIcon>
                    Register
                  </a>
                </NextLink>
              </MenuItem>
            </>
        }

        {
          (props.profile.email) ? 
          <MenuItem key="logout" onClick={() => {
            var profile = {
              name: '',
              username: '',
              account: [],
              email: ''
            };
            props.save_user_data({ user: profile })
            router.push('/');
            toast.success('Logout Successfully!')
          }}>
              
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem> : ""
        }

      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);