import React, { Component, useContext } from 'react'
import {
    Typography,
    Button,
    Box,
    Grid,

} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from "next/image";
import homeHandpicked from "../../public/home/L_g0126641815.webp"
import { borderRadius } from '@material-ui/system';
import styles from "../../styles/home.module.css";

const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    //padding: theme.spacing(1),
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
    boxShadow: 'none',
    borderRadius: '0px'
}));


const imageContent = (props) => {
    var p = {
        src: "/home/banner2.jpg",
        title: "Banner"
    }
    var banner = {
        src: "/home/banner3.jpg",
        title: "Banner"
    }
    var fullbanner = {
        src: "/home/banner4.jpg",
        title: "Banner"
    }
    return (

        <Grid container  justifyContent="center" alignItems="center" spacing={2} mt={2}>
            <Grid item xs={6}>
                <img src={p.src} alt={p.title}/>
            </Grid>
            <Grid item xs={6}>
                <Box>
                    <img src={banner.src} alt={banner.title}/>
                </Box>
                <Box mt={2}>
                    <img src={fullbanner.src} alt={fullbanner.title}/>
                </Box>
                
                
            </Grid>
        </Grid>
    );
};

export default imageContent;