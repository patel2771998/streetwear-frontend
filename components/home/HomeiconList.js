import React, { Component, useContext } from 'react'
import {
    Typography,
    Button,
    Box,
    Grid,

} from "@material-ui/core";
import styles from "../../styles/home.module.css";
import { IconContext } from "react-icons";
import { ImAirplane  } from "react-icons/im";
import { BiSupport, BiSync } from "react-icons/bi";
import {FcProcess } from "react-icons/fc";
import {IoSync } from "react-icons/io5";
import { RiCoupon2Line } from "react-icons/ri";
import {GrSync, GrDeliver } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";







const homeiconList = (props) => {
    
    return (
        <Grid container  justifyContent="center" alignItems="center">
            <Grid item xs={3}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <div className="iconHome">
                        <IconContext.Provider  value={{ color: "white" }} >
                            <FiTruck size={40}/>
                        </IconContext.Provider>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.icontitle}>Free Shipping</Typography>
                        <Typography variant="body1">Free Shipping</Typography>
                    </div>
                </div>
            </Grid>
            <Grid item xs={3}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <div className="iconHome">
                        <IconContext.Provider  value={{ color: "white"}} >
                            <BiSync size={40} className={styles.supportIcon}/>
                        </IconContext.Provider>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.icontitle}>Free Returns</Typography>
                        <Typography variant="body1">Free Shipping</Typography>
                    </div>
                </div>
            </Grid> 
           <Grid item xs={3}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <div className="iconHome">
                        <IconContext.Provider  value={{ color: "white" }} >
                            <RiCoupon2Line size={40}/>
                        </IconContext.Provider>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.icontitle}>Get 15% off</Typography>
                        <Typography variant="body1">at 1st Order</Typography>
                    </div>

                </div>
            </Grid>

            <Grid item xs={3}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <div className="iconHome">
                        <IconContext.Provider  value={{ color: "white", className: "iconHomeClass"}} >
                            <BiSupport size={40} className={styles.supportIcon}/>
                        </IconContext.Provider>
                    </div>
                    <div>
                        <Typography variant="h6" className={styles.icontitle}>We Support</Typography>
                        <Typography variant="body1">24/7 amazing services</Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default homeiconList;