import {
  Typography,
  Box,
  Grid
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link"
import homeHandpicked from "../../public/home-handpicked.jpeg"
import stretlogo from "../../public/stret-white.png"
import styles from "../../styles/footer.module.css";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container';
import { ArrowRight } from 'react-bootstrap-icons';
import { FaBeer } from 'react-icons/fa';
import { BsFillTelephoneFill, BsEnvelope } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

const headersData = [
  
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
  
];

export default function Footer() {


  function ContactList(lists) {
    const listItems = lists.map((number) =>
      <li>
        <Link href={number.link} style={{ color: "#fff" }} className={styles.menulink}>
          <a className={styles.menulink} style={{ color: "#fff" }}>
            <GoLocation />
            {number.label}
            <FaBeer />
            <BsFillTelephoneFill />
          </a>
        </Link>
      </li>
    );
    return (
      <ul className={styles.ullist}>
        <li>
          <Link href="tel:+1939292994" style={{ color: "#fff" }} className={styles.menulink}>
            <a className={styles.menulink} style={{ color: "#fff" }}>
              <span className={styles.iconspan}><BsFillTelephoneFill /></span>
              +1 939292994
            </a>
          </Link>
        </li>
        <li>
          <Link href="mailto:info@stret.com" style={{ color: "#fff" }} className={styles.menulink}>
            <a className={styles.menulink} style={{ color: "#fff" }}>
              <span className={styles.iconspan}><BsEnvelope /></span>
              info@stret.com
            </a>
          </Link>
        </li>
        <li style={{ color: "#fff" }}>
        <span className={styles.iconspan}><GoLocation /></span>
        580-0015 4-23-7 Shindou, Matsubara, Osaka</li>
      </ul>
    );
  }

  const numbers = [
    {
      'label': '+1 939292994',
      'link': 'tel:+1939292994'
    },
    {
      'label': 'info@thinkinfoservices.com',
      'link': 'mailto:info@thinkinfoservices.com'
    }
  ];

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <li className={styles.menulist}>
          <Link href={href} style={{ color: "#fff" }} className={styles.menulink}>
            <a className={styles.menulink} style={{ color: "#fff" }}>
              {label}
            </a>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="">
        <div style={{ height: '' }} className={styles.footer}>
          <Container>
            <Grid container justifyContent="top" alignItems="top">
              <Grid item xs={3}>
                <div style={{ display: 'block' }}>
                  <Image src={stretlogo} width="150" height="50" className={styles.footerlogo} style={{ display: 'block', width: "50px", marginBottom: '40px' }} />
                  <Typography className={styles.title} variant="p" component="p" gutterBottom>Sed ac odio aliquet, fringilla odio eget, tincidunt nunc. Duis aliquet pulvinar ante tempor tincidunt.</Typography>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={2}>
                <Box style={{ textAlign: 'left', width: "80%", margin: "0 auto" }}>
                  <Typography variant="h6" className={styles.footerMenutitle}>Company</Typography>
                  <ul class={styles.menuUL}>
                    {getMenuButtons()}
                  </ul>
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box style={{ textAlign: 'left', width: "80%", margin: "0 auto" }}>
                  <Typography variant="h6" className={styles.footerMenutitle}>Shop with us</Typography>
                  <ul class={styles.menuUL}>
                    {getMenuButtons()}
                  </ul>
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box style={{ textAlign: 'left', width: "100%", margin: "0 auto", padding: '0' }}>
                  <Typography variant="h6" className={styles.footerMenutitle}>Connect with us</Typography>
                  {ContactList(numbers)}
                </Box>
              </Grid>

            </Grid>
          </Container>
        </div>
        <div style={{ height: '' }} className={styles.footerBottom}>
          <Container>
          <Grid container justifyContent="top" alignItems="center">
              <Grid item xs={6}>
                <Typography className={styles.title} variant="p" component="p" gutterBottom>Stret @2022</Typography>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'right'}}>
                <Typography className={styles.title} variant="p" component="p" gutterBottom>Design & Develop by Think Info Services</Typography>
              </Grid>
          </Grid>
          </Container>
      
        </div>
    </div>


  );
}
