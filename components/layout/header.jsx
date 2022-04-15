import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Box,
  FormHelperText

} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react"
import DisplayContext from "../../context/display-context"
import StoreContext from "../../context/store-context"
import { Link as RouterLink } from "react-router-dom";
import Link from "next/link"
import Image from "next/image"
import stretlogo from "../../public/stret-logo.png"
//import stretlogo from "../../public/home-2-revolution-img-1.jpeg"

import { BiAlignJustify } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi"
import { quantity, sum, test } from "../../utils/helper-functions"
import styles from "../../styles/nav-bar.module.css"

const headersData = [
  {
    label: "Home",
    href: "/home",
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
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    color: "#111"

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
    zIndex: 110,
  },
  headerMain: {
    display: 'flex',
    width: "100%"
  },
  menumain: {
    display: 'flex',
    width: "100%",
    color: "#111 "
  },
  headerRight: {
    display: 'flex',
    flex: 1,
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
    backgroundColor: "white",
  }
}));



// useEffect(() => {
//     if (router.pathname === "/checkout" || router.pathname === "/payment") {
//       setIsCheckout(true)
//     } else {
//       setIsCheckout(false)
//     }
//   }, [router.pathname]);

export default function Header() {
  const classes = useStyles();
  const { updateCartViewDisplay } = useContext(DisplayContext)
  const { cart } = useContext(StoreContext)
  const [isCheckout, setIsCheckout] = useState(true)

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
    <button className={styles.btn} onClick={() => updateCartViewDisplay()}>
      <BiShoppingBag />{" "}
      <span>
        {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
      </span>
    </button>
  )


  const streetwearlogo = (
    <Box>
      <Link href="/">
        <a style={{ width: "100px", color: "#aaa" }}>
          <Image src={stretlogo} height="25px" width="100%" alt="logo" />
        </a>
      </Link>
    </Box>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (


        <div className={classes.menumain}>
          <Link href={href} className={classes.menuButton} style={{ color: "#aaa" }}>
            {label}
          </Link>
        </div>
      );
    });
  };




  return (
    <AppBar className={classes.appbar}>
      {displayDesktop()}
    </AppBar>
  );
}
