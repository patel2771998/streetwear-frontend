import Modal from 'react-bootstrap/Modal'
import React, { Component, useState } from 'react'
import {
  Typography,
  Button,
  Box,
  Grid,

} from "@material-ui/core";
import styles from "../../styles/product.module.css";
import { createClient } from "../../utils/client";
import { formatPrices } from "../../utils/prices";
import Image from "next/image";
import Quickview from "./quickViewProduct";
import { BsXLg } from "react-icons/bs";
import Link from "next/link"
import { RiArrowGoBackFill } from 'react-icons/ri';


const quickView = (props) => {

  const product = props.product;
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="lg" animation="true" centered >
        <Box p={2} style={{backgroundColor: 'black', boxShadow: '0px 0px 20px 5px #1b1919cc '}}>
          <a onClick={props.handleClose} href="#" className={styles.closemodal}>
            <BsXLg  onClick={props.handleClose} />
          </a>
          <Quickview product={props.product} />
        </Box>
      </Modal>
    </>
  );
}
export default quickView;
