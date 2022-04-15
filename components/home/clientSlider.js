import React, { Component } from 'react'  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";  
import { Box, Typography } from '@material-ui/core';
import styles from "../../styles/home.module.css";

//import '../../styles/slider.module.css';  




export class clientSlider extends Component {  
    render() {  
        var settings = {  
          dots: false,  
          infinite: true,  
          speed: 100,  
          centerMode: true,  
          slidesToShow: 4,  
          slidesToScroll: 1,
          autoplay: true
          };  
          return (  
            
            <Slider {...settings} >  
              <Box className={styles.clientSMain}>  
              <img  className={styles.clientSMainImage} src= {'clients-1.png'} /> 
              </Box>  
              <Box className={styles.clientSMain}>  
              <img className={styles.clientSMainImage} src= {'clients-2.png'} />  
              </Box>  
              <Box className={styles.clientSMain}>  
              <img  className={styles.clientSMainImage} src= {'clients-3.png'} />  
              </Box>  
              <Box className={styles.clientSMain}>  
              <img  className={styles.clientSMainImage} src= {'clients-4.png'} />  
              </Box >  
              <Box className={styles.clientSMain}>  
              <img  className={styles.clientSMainImage} src= {'clients-5.png'} />  
              </Box>  
            </Slider>
          );  
        }  
      }  
  
export default clientSlider