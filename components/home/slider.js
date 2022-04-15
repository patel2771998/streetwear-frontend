import React, { Component } from 'react'  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";  
import { Box, Typography } from '@material-ui/core';
import styles from '../../styles/slider.module.css';  


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}


export class slider extends Component {  
    render() {  
        var settings = {  
          dots: false,  
          infinite: true,  
          speed: 500,  
          centerMode: true,  
          slidesToShow: 1,  
          slidesToScroll: 1,
          autoplay: true,
          arrows: true,
          arrow: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />  
          };  
          return (  
            
            <Slider {...settings} >  
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-1.jpeg'} className={styles.hsImage}/> 
              <Typography>Bringing </Typography> 
              </Box>  
              <Box className={styles.wdt}>  
              <img style={{"height":"40px"}}   src= {'home/home-2-revolution-img-2.jpeg'} className={styles.hsImage}/>  
              </Box>  
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-1.jpeg'} className={styles.hsImage}/>  
              </Box>  
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-1.jpeg'} className={styles.hsImage}/>  
              </Box >  
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-2.jpeg'} className={styles.hsImage}/>  
              </Box>  
              <Box className={styles.wdt}>  
              <img  className={styles.hsImage} src= {'home/home-2-revolution-img-1.jpeg  '} className={styles.hsImage}/>  
              </Box>  
            </Slider>
          );  
        }  
}  
  
export default slider