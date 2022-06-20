import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Box,
  FormHelperText,
  withTheme

} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react"
import DisplayContext from "../../context/display-context"
import StoreContext from "../../context/store-context"
import { Link as RouterLink } from "react-router-dom";
import Link from "next/link"
import Image from "next/image"
import stretlogo from "../../public/stret-white.png"
//import stretlogo from "../../public/home-2-revolution-img-1.jpeg"

//import { BiAlignJustify } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi"
import { quantity, sum, test } from "../../utils/helper-functions"
import styles from "../../styles/nav-bar.module.css"
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';
import AccountMenu from './AccountMenu';


const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Jeans",
    href: "/jeans",
  },
  {
    label: "T-Shirts",
    href: "/tshirt",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];


const useStyles = makeStyles(() => ({
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 500,
    size: "14px",
    marginLeft: "0",
    color: "#fff"

  },
  header: {
    backgroundColor: '',
    display: 'flex',
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'middle',
    margin: 0,
    padding: 0,
    zIndex: 1,
  },
  headerMain: {
    display: 'flex',
    width: "100%"
  },
  menumain: {
    display: 'flex',
    width: "100%",
    color: "#fff"
  },
  headerRight: {
    display: 'flex',
    flex: 3,
    alignItems: 'center'
  },
  headerLeft: {
    flex: 1
  },
  headerWrapmain: {
    display: 'flex',
    justifyAlign: "center",
    flex: 1
  },
  appbar: {
    backgroundColor: "black",
    boxShadow: '0px 0px 29px 11px rgb(43 34 34 / 91%)'
  },
  icon:{
    color: 'white',
  },
  cartitem:{
    color: 'white',
    position: 'absolute',
    top: '-9px',
    left: '17px',
    fontSize: '12px',
    color: '#ff84eb'
  },
  cartbbutton:{
    position: 'relative',
    background: 'transparent',
    border: 'none'
  }
  
}));

// useEffect(() => {
 
//     getEmployeeKpi(props)
// }, [router.isReady])

const getCollections = async (props) => {
  var headers = {
    "Content-Type": "application/json",
    //"x-access-token": props.profile.token
    //"x-access-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY1MzcxMzkxOCwiZXhwIjoxNjU0MzE4NzE4fQ.0GmpZdHhfh6ZOlbmYtJxaE8hgFOslqWpCbC2I22SvSs'
  }
  props.loaderRef(true)
  var employeeKpiList = await ApiServices.GetApiCall(ApiEndpoint.EMPLOYEE_KPI + props.router.query.ratingId, headers)
  props.loaderRef(false)
  console.log(employeeKpiList, 'employeeKpiList', props.router.query.ratingId);
  
}
// useEffect(() => {

//     async function getCollections(){
        
//     }
// });

// useEffect(() => {
//     if (router.pathname === "/checkout" || router.pathname === "/payment") {
//       setIsCheckout(true)
//     } else {
//       setIsCheckout(false)
//     }
//   }, [router.pathname]);

const Header = (props) => {
  const classes = useStyles();
  const { updateCartViewDisplay } = useContext(DisplayContext)
  const { cart } = useContext(StoreContext)
  const [isCheckout, setIsCheckout] = useState(true)
  const [isRender, setRender] = useState(false)
  const [isLogoutOpen, setLogoutOpen] = useState(false);


  useEffect(() => {
    setRender(true)
  }, [classes])


  const displayDesktop = () => {
    return (
      <Toolbar className={classes.headerMain}>
        <Box className={classes.headerWrapmain}>
          <Box className={classes.headerLeft}>{streetwearlogo}</Box>
          <Box className={classes.headerRight}>
            <Box className={classes.headerMain}>{getMenuButtons()}</Box>
            
            <Box>{getRightIcon}</Box>
          </Box>
        </Box>
      </Toolbar>
    );
  };
  const getRightIcon = (
    <>
    <Box style={{display: "flex"}}>
        <AccountMenu />
        <button className={classes.cartbbutton} onClick={() => updateCartViewDisplay()}>
          <BiShoppingBag className={classes.icon} />{" "}
          <span className={classes.cartitem}>
            {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
          </span>
        </button>
    </Box>
    
    </>
  )


  const streetwearlogo = (
    <Box>
      {/* <Link href="/">
        <a style={{ width: "100px", color: "#aaa" }}>
            <Image src={stretlogo}   alt="logo" />
        </a>
      </Link> */}
    </Box>
  );

  const getMenuButtons = () => {
    const router = useRouter();

    return headersData.map(({ label, href }) => {
      return (
        <div className={classes.menumain}>
          <Link href={href} className={classes.menuButton}  style={{color:'white'}}>
            <a className={router.pathname == href ? "active " + classes.menuButton : classes.menuButton} >
            {label}
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
    {isRender ? <AppBar className={classes.appbar}>
      {displayDesktop()}
    </AppBar> : <></>}
  </>
  );
}
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);