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
    var title = props.sectionContent.title;
    var subtitle = props.sectionContent.subtitle;
    return (

        <Grid container  justifyContent="center" alignItems="center">
            <Grid item xs={6}>
                <Box style={{ textAlign: 'left', width:"80%", margin: "0 auto" }}>
                    <Typography className={styles.h6} variant="h6" component="h6" gutterBottom>{subtitle}</Typography>
                    <Typography className={styles.h1} variant="h1" component="div" gutterBottom>{title}</Typography>
                    <Typography variant="p" component="div" gutterBottom className={styles.p}>Sed ac odio aliquet, fringilla odio eget, tincidunt nunc. Duis aliquet pulvinar ante tempor tincidunt. Nullam pellentesque ipsum quis suscipit ullamcorper. Pellentesque enim sapien, rutrum nec lectus et, interdum imperdiet nunc.</Typography>
                    <Button href="#text-buttons" variant="outlined" color="primary" className={styles.button}>Shop Now</Button>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <img src="home/L_g0126641815.webp" alt="image"  />
            </Grid>
        </Grid>
    );
};

export default imageContent;