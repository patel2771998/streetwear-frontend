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
import homeHandpicked from "../../public/men-banner.jpeg"
import { borderRadius } from '@material-ui/system';
import styles from "../../styles/home.module.css";
import { BiLock } from 'react-icons/bi';
import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import Container from 'react-bootstrap/Container';


const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    //padding: theme.spacing(1),
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
    boxShadow: 'none',
    borderRadius: '0px'
}));


const bannerMiddle = () => {



    return (

        <Grid container  justifyContent="top" alignItems="center">
            <Container>
                <Grid item xs={4}>
                    <div style={{display: 'block', height: '100vh'}}>
                        <Typography  variant="h1" component="h1" style={{ color: '#fff', margin:'50px 0px 0px' }}>Clothing Super Store</Typography>
                        <Button href="#text-buttons"  color="primary" className={styles.button} >Shop Now</Button>

                    </div>
                </Grid>  
            </Container>          
        </Grid>
    );
};

export default bannerMiddle;